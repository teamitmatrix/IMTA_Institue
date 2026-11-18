import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { CONTENT_UPDATED } from "@/data/seo";
import { siteUrl } from "@/lib/env/public";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/courses", priority: 0.9 },
  { path: "/flagship", priority: 0.9 },
  { path: "/explore", priority: 0.7 },
  { path: "/for-teams", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/apply", priority: 0.6 },
];

/** Only canonical URLs. The flagship course URL canonicalizes to /flagship, so it is excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00Z`);
  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...courses
      .filter((course) => !course.isFlagship)
      .map((course) => ({
        url: `${siteUrl}/courses/${course.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
