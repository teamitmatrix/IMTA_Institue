import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/lib/env/public";
import type { Database } from "@/types/database";

/**
 * Browser Supabase client (publishable key only; access is governed by RLS).
 * Use inside Client Components, e.g. for future student auth.
 */
export function createClient() {
  const { url, publishableKey } = getSupabasePublicEnv();
  return createBrowserClient<Database>(url, publishableKey);
}
