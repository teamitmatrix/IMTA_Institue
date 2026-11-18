import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getServerEnv } from "@/lib/env/server";

export interface RequestMeta {
  /** Salted SHA-256 of the client IP — the raw IP is never stored. */
  ipHash: string;
  userAgent: string | null;
  sourcePath: string | null;
}

/** Collects minimal, privacy-preserving request metadata inside a Server Action. */
export async function getRequestMeta(): Promise<RequestMeta> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const { rateLimitSalt } = getServerEnv();

  let sourcePath: string | null = null;
  const referer = h.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      sourcePath = url.pathname.slice(0, 500); // path only — no query strings or other sites' URLs
    } catch {
      sourcePath = null;
    }
  }

  return {
    ipHash: createHash("sha256").update(`${rateLimitSalt}:${ip}`).digest("hex"),
    userAgent: h.get("user-agent")?.slice(0, 500) ?? null,
    sourcePath,
  };
}
