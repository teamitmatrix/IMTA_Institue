"use server";

import * as z from "zod/mini";
import { applicationSchema } from "@/lib/validations/application";
import { checkSpamTraps } from "@/lib/security/spam";
import { rateLimit } from "@/lib/security/rate-limit";
import { getRequestMeta } from "@/lib/security/request";
import { isSupabaseAdminConfigured } from "@/lib/env/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactFallback, hashForKey, mapDbError, readBooleanSetting, runSafely } from "@/lib/actions/shared";
import type { ActionResult } from "@/lib/utils/action-result";

/**
 * Application form handler (BRD §K).
 * Never trusts the client: everything is re-validated here. Expected
 * failures are returned as values for the form to display.
 */
export async function submitApplication(input: unknown): Promise<ActionResult> {
  return runSafely("apply", () => handle(input));
}

async function handle(input: unknown): Promise<ActionResult> {
  // 1. Validate
  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const data = parsed.data;

  // 2. Spam traps
  const verdict = checkSpamTraps(data);
  if (verdict.spam) {
    if (verdict.reason === "honeypot") return { ok: true, data: undefined }; // silent: bots learn nothing
    if (verdict.reason === "too-fast") {
      return { ok: false, message: "That was quick! Please review your details and submit again." };
    }
    return { ok: false, message: "This form has expired. Please refresh the page and try again." };
  }

  // 3. Rate limits (per IP and per email; keys are salted hashes)
  const meta = await getRequestMeta();
  const [ipOk, emailOk] = await Promise.all([
    rateLimit(`apply:ip:${meta.ipHash.slice(0, 40)}`, 5, 600),
    rateLimit(`apply:email:${hashForKey(data.email)}`, 3, 3600),
  ]);
  if (!ipOk || !emailOk) {
    return { ok: false, message: "Too many attempts. Please wait a few minutes and try again." };
  }

  // 4. Storage available?
  if (!isSupabaseAdminConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[apply] Supabase not configured — accepted without storing (dev only).", { course: data.course });
      return { ok: true, data: undefined };
    }
    console.error("[apply] Supabase is not configured in production.");
    return { ok: false, message: `We couldn't submit your application right now. ${contactFallback}` };
  }

  if (!(await readBooleanSetting("applications_open", true))) {
    return { ok: false, message: `Applications are paused right now. ${contactFallback}` };
  }

  // 5. Insert or refresh (duplicate email + course updates the open application)
  try {
    const { data: rows, error } = await createAdminClient().rpc("submit_application", {
      p_full_name: data.fullName,
      p_email: data.email,
      p_role_title: data.currentRole,
      p_course_slug: data.course,
      p_country_code: data.country,
      p_learner_status: data.learnerStatus,
      p_message: data.message ?? null,
      p_source_path: meta.sourcePath,
      p_user_agent: meta.userAgent,
      p_ip_hash: meta.ipHash,
    });
    if (error) return mapDbError(error, "apply");

    // Same response for new and duplicate submissions, so the form never
    // reveals whether an email address has applied before.
    if (rows?.[0]?.is_duplicate) console.info("[apply] duplicate submission refreshed existing application");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error("[apply] unexpected error:", error instanceof Error ? error.message : error);
    return { ok: false, message: `Something went wrong on our side. ${contactFallback}` };
  }
}
