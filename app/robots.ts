import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env/public";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
