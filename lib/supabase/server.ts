import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/lib/env/public";
import type { Database } from "@/types/database";

/**
 * Request-scoped Supabase client that acts as the signed-in user (cookie session).
 *
 * Use ONLY in Server Actions, Route Handlers, or dynamic Server Components
 * wrapped in <Suspense>. Reading cookies makes a route dynamic, and the
 * marketing pages are enforced static (`ensureStatic` in app/layout.tsx).
 */
export async function createClient() {
  const { url, publishableKey } = getSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Safe to ignore if a proxy refreshes sessions (add when auth ships).
        }
      },
    },
  });
}
