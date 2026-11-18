import type { NextConfig } from "next";

/**
 * Baseline security headers (BRD §N). A Content-Security-Policy is added
 * once third-party scripts (analytics, Supabase auth) are finalised.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // next/image serves modern formats (AVIF, then WebP) for any photos added later.
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The curriculum is part of the flagship program (BRD §D/§H), not a standalone page.
      { source: "/curriculum", destination: "/flagship#curriculum", permanent: false },
    ];
  },
};

export default nextConfig;
