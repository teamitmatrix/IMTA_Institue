import "server-only";
import { z } from "zod";

/**
 * Server-only secrets. The `server-only` import makes the build fail if this
 * module is ever imported from a Client Component.
 */
const isProduction = process.env.NODE_ENV === "production";

const serverSchema = z.object({
  supabaseSecretKey: z.string().min(1).optional(),
  rateLimitSalt: isProduction
    ? z.string().min(16, { error: "RATE_LIMIT_SALT must be at least 16 characters in production" })
    : z.string().min(1).default("dev-only-salt-not-for-production"),
});

export function getServerEnv(): z.infer<typeof serverSchema> {
  const result = serverSchema.safeParse({
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || undefined,
    rateLimitSalt: process.env.RATE_LIMIT_SALT || undefined,
  });

  if (!result.success) {
    throw new Error(
      `Server environment is incomplete: ${result.error.issues.map((i) => i.message).join("; ")}. See .env.example.`,
    );
  }
  return result.data;
}

/** The Supabase secret (service-role) key. Throws if it is missing. */
export function getSupabaseSecretKey(): string {
  const key = getServerEnv().supabaseSecretKey;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set. See .env.example.");
  return key;
}

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
      process.env.SUPABASE_SECRET_KEY,
  );
}
