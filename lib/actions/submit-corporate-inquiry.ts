"use server";

import * as z from "zod/mini";
import { corporateInquirySchema } from "@/lib/validations/corporate-inquiry";
import { checkSpamTraps } from "@/lib/security/spam";
import { rateLimit } from "@/lib/security/rate-limit";
import { getRequestMeta } from "@/lib/security/request";
import { isSupabaseAdminConfigured } from "@/lib/env/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactFallback, hashForKey, mapDbError, readBooleanSetting, runSafely } from "@/lib/actions/shared";
import type { ActionResult } from "@/lib/utils/action-result";

/** Company training request handler (BRD §I). Same safeguards as applications. */
export async function submitCorporateInquiry(input: unknown): Promise<ActionResult> {
  return runSafely("inquiry", () => handle(input));
}

async function handle(input: unknown): Promise<ActionResult> {
  const parsed = corporateInquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const data = parsed.data;

  const verdict = checkSpamTraps(data);
  if (verdict.spam) {
    if (verdict.reason === "honeypot") return { ok: true, data: undefined };
    if (verdict.reason === "too-fast") {
      return { ok: false, message: "That was quick! Please review your details and submit again." };
    }
    return { ok: false, message: "This form has expired. Please refresh the page and try again." };
  }

  const meta = await getRequestMeta();
  const [ipOk, emailOk] = await Promise.all([
    rateLimit(`inquiry:ip:${meta.ipHash.slice(0, 40)}`, 5, 600),
    rateLimit(`inquiry:email:${hashForKey(data.workEmail)}`, 3, 3600),
  ]);
  if (!ipOk || !emailOk) {
    return { ok: false, message: "Too many attempts. Please wait a few minutes and try again." };
  }

  if (!isSupabaseAdminConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] Supabase not configured — accepted without storing (dev only).", {
        companySize: data.companySize,
      });
      return { ok: true, data: undefined };
    }
    console.error("[inquiry] Supabase is not configured in production.");
    return { ok: false, message: `We couldn't send your request right now. ${contactFallback}` };
  }

  if (!(await readBooleanSetting("corporate_inquiries_open", true))) {
    return { ok: false, message: `Team training requests are paused right now. ${contactFallback}` };
  }

  try {
    const { error } = await createAdminClient().rpc("submit_corporate_inquiry", {
      p_company_name: data.companyName,
      p_contact_name: data.contactName,
      p_work_email: data.workEmail,
      p_job_title: data.jobTitle ?? null,
      p_country_code: data.country,
      p_company_size: data.companySize,
      p_training_interests: data.trainingInterests,
      p_delivery_preference: data.deliveryPreference,
      p_message: data.message ?? null,
      p_source_path: meta.sourcePath,
      p_user_agent: meta.userAgent,
      p_ip_hash: meta.ipHash,
    });
    if (error) return mapDbError(error, "inquiry");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error("[inquiry] unexpected error:", error instanceof Error ? error.message : error);
    return { ok: false, message: `Something went wrong on our side. ${contactFallback}` };
  }
}
