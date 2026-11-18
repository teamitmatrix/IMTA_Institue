import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/lib/env/public";
import type { Database } from "@/types/database";

/**
 * Cookie-less client with the publishable key, for public reads inside
 * `'use cache'` functions (cached pages must not read cookies). RLS limits
 * it to published courses, published cohorts and public settings.
 */
export function createPublicClient() {
  const { url, publishableKey } = getSupabasePublicEnv();
  return createSupabaseClient<Database>(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
