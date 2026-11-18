import "server-only";
import { createHash } from "node:crypto";
import type { PostgrestError } from "@supabase/supabase-js";
import { site } from "@/data/site";
import { getServerEnv, isSupabaseAdminConfigured } from "@/lib/env/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "@/lib/utils/action-result";

export const contactFallback = `Please try again in a moment, or email ${site.contactEmail} and we'll help you directly.`;

/** Salted hash for rate-limit keys, so no raw email/IP is stored. */
export function hashForKey(value: string): string {
  return createHash("sha256").update(`${getServerEnv().rateLimitSalt}:${value}`).digest("hex").slice(0, 40);
}

/** Maps Postgres/PostgREST errors to safe, user-facing results (no internals leak). */
export function mapDbError(error: PostgrestError, context: string): ActionResult {
  console.error(`[${context}] database error`, { code: error.code, message: error.message });
  switch (error.code) {
    case "23503": // foreign key — e.g. unknown course
      return { ok: false, message: "Please check the highlighted fields.", fieldErrors: { course: ["This course isn't available. Please choose another."] } };
    case "23514": // check constraint
    case "22P02": // invalid enum/text representation
      return { ok: false, message: "Some details look invalid. Please review the form and try again." };
    case "42501": // permission denied — misconfigured keys
    case "PGRST301":
      return { ok: false, message: `We couldn't submit right now. ${contactFallback}` };
    default:
      return { ok: false, message: `Something went wrong on our side. ${contactFallback}` };
  }
}

/**
 * Runs a Server Action body so that ANY unexpected throw (missing config,
 * network failure, bug) becomes a friendly result instead of an HTTP 500.
 * Logs carry no personal data.
 */
export async function runSafely(context: string, fn: () => Promise<ActionResult>): Promise<ActionResult> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[${context}] unexpected error:`, error instanceof Error ? error.message : error);
    return { ok: false, message: `Something went wrong on our side. ${contactFallback}` };
  }
}

/** Reads a boolean site setting with the admin client; defaults to `fallback` on any error. */
export async function readBooleanSetting(key: string, fallback: boolean): Promise<boolean> {
  if (!isSupabaseAdminConfigured()) return fallback;
  try {
    const { data, error } = await createAdminClient().from("site_settings").select("value").eq("key", key).maybeSingle();
    if (error || !data) return fallback;
    return typeof data.value === "boolean" ? data.value : fallback;
  } catch {
    return fallback;
  }
}
