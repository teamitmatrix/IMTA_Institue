import { z } from "zod";

/**
 * Public (browser-safe) environment variables.
 * Each `process.env.NEXT_PUBLIC_*` must be referenced literally so Next.js
 * can inline it at build time.
 */

const siteUrlSchema = z.url().default("http://localhost:3000");

export const siteUrl = siteUrlSchema.parse(process.env.NEXT_PUBLIC_SITE_URL || undefined).replace(/\/$/, "");

const supabasePublicSchema = z.object({
  url: z.url({ error: "NEXT_PUBLIC_SUPABASE_URL must be a valid URL" }),
  publishableKey: z.string().min(1, { error: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required" }),
});

export type SupabasePublicEnv = z.infer<typeof supabasePublicSchema>;

/**
 * Validated lazily so the marketing site builds and runs before Supabase is
 * configured. Throws a clear error only when a Supabase client is created.
 */
export function getSupabasePublicEnv(): SupabasePublicEnv {
  const result = supabasePublicSchema.safeParse({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });

  if (!result.success) {
    throw new Error(
      `Supabase is not configured: ${result.error.issues.map((i) => i.message).join("; ")}. See .env.example.`,
    );
  }

  return result.data;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
