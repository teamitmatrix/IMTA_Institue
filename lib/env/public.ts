import { z } from "zod";

/**
 * Public (browser-safe) environment variables.
 * Each `process.env.NEXT_PUBLIC_*` must be referenced literally so Next.js
 * can inline it at build time.
 */

// Production falls back to the live domain so a missing env var can never
// publish localhost canonicals, sitemap entries or OG URLs.
const siteUrlSchema = z
  .url()
  .default(process.env.NODE_ENV === "production" ? "https://institute.imta.io" : "http://localhost:3000");

const rawSiteUrl = siteUrlSchema.parse(process.env.NEXT_PUBLIC_SITE_URL || undefined).replace(/\/$/, "");

// The site is HTTPS-only (HSTS), so canonicals and the sitemap must be too —
// even if the host's env var was entered as http://. Local URLs are left alone.
export const siteUrl =
  process.env.NODE_ENV === "production" && !/^http:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(rawSiteUrl)
    ? rawSiteUrl.replace(/^http:\/\//, "https://")
    : rawSiteUrl;

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
