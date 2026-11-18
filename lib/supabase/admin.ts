import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/lib/env/public";
import { getSupabaseSecretKey } from "@/lib/env/server";
import type { Database } from "@/types/database";

/**
 * Privileged Supabase client using the SECRET key. Bypasses Row Level Security.
 *
 * - Server-only (enforced by the `server-only` import).
 * - Used only for trusted writes after server-side validation.
 * - Never return raw rows to the browser.
 */
export function createAdminClient() {
  const { url } = getSupabasePublicEnv();
  return createSupabaseClient<Database>(url, getSupabaseSecretKey(), {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
