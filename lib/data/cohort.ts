import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { CohortConfig } from "@/types/content";
import { cohort as fallbackCohort } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/env/public";
import { createPublicClient } from "@/lib/supabase/public";

const FLAGSHIP_SLUG = "ai-for-professionals";

/**
 * US-friendly time-zone label. IANA zones ("America/New_York") become the
 * generic US abbreviation ("ET"), so the label stays right across daylight
 * saving; anything else (e.g. "ET") is shown as entered.
 */
export function formatTimeZone(timeZone: string, onDate?: string | null): string {
  try {
    const date = onDate ? new Date(`${onDate}T12:00:00Z`) : new Date(Date.UTC(2026, 0, 15));
    const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortGeneric" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value;
    return part ?? timeZone;
  } catch {
    return timeZone; // not an IANA zone — keep what staff entered
  }
}

/**
 * The next published flagship cohort from `cohort_information`.
 *
 * - Cached for an hour (pages stay static; `revalidateTag("cohorts")` refreshes sooner).
 * - Reads with the publishable key; RLS only exposes published rows.
 * - Every field falls back to data/site.ts, which shows "Announced soon"
 *   instead of inventing dates, times or prices.
 */
export async function getFlagshipCohort(): Promise<CohortConfig> {
  "use cache";
  cacheLife("hours");
  cacheTag("cohorts");

  if (!isSupabaseConfigured()) return fallbackCohort;

  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await createPublicClient()
      .from("cohort_information")
      .select("start_date, session_times, time_zone, fee_amount, fee_currency")
      .eq("course_slug", FLAGSHIP_SLUG)
      .eq("is_published", true)
      .or(`start_date.is.null,start_date.gte.${today}`)
      .order("start_date", { ascending: true, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[cohort] read failed, using fallback:", error.message);
      return fallbackCohort;
    }
    if (!data) return fallbackCohort;

    const sessionTimes = data.session_times
      ? data.time_zone
        ? `${data.session_times} ${formatTimeZone(data.time_zone, data.start_date)}`
        : data.session_times
      : null;

    return {
      nextCohortStart: data.start_date ?? fallbackCohort.nextCohortStart,
      fee: data.fee_amount !== null ? { amount: Number(data.fee_amount), currency: data.fee_currency } : fallbackCohort.fee,
      sessionTimes: sessionTimes ?? fallbackCohort.sessionTimes,
    };
  } catch (error) {
    console.error("[cohort] unexpected error, using fallback:", error instanceof Error ? error.message : error);
    return fallbackCohort;
  }
}
