import "server-only";
import { isSupabaseAdminConfigured } from "@/lib/env/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { memoryRateLimit } from "@/lib/security/memory-rate-limit";

/**
 * Shared rate limit backed by public.check_rate_limit() so limits hold across
 * serverless instances. Falls back to the in-memory limiter if the database
 * is not configured or unreachable (fail-soft: forms keep working).
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  if (isSupabaseAdminConfigured()) {
    try {
      const { data, error } = await createAdminClient().rpc("check_rate_limit", {
        p_key: key,
        p_limit: limit,
        p_window_seconds: windowSeconds,
      });
      if (!error && typeof data === "boolean") return data;
      console.error("[rate-limit] database check failed, using memory fallback:", error?.message);
    } catch (error) {
      console.error("[rate-limit] database unreachable, using memory fallback:", error);
    }
  }
  return memoryRateLimit(key, { limit, windowMs: windowSeconds * 1000 });
}
