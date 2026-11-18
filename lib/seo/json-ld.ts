import type { Course, FaqItem } from "@/types/content";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/env/public";

/** schema.org builders for structured data (BRD FR-14). */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo1.jpeg`,
    email: site.contactEmail,
    description: site.description,
    parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/**
 * Course structured data — facts only. No `offers`/price until a real price
 * is configured, and no ratings or reviews (none exist).
 */
export function courseJsonLd(course: Course, options: { path?: string; startDate?: string | null } = {}) {
  const { liveSessions, sessionLength } = course.format;
  // Workload only where the source states both counts (flagship: 12 × 2 hours = PT24H).
  const hoursPerSession = Number(sessionLength?.match(/^(\d+) hours?/)?.[1] ?? 0);
  const hours = liveSessions && hoursPerSession ? liveSessions * hoursPerSession : null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `${siteUrl}${options.path ?? `/courses/${course.slug}`}`,
    inLanguage: "en-US",
    provider: { "@type": "EducationalOrganization", "@id": `${siteUrl}/#organization`, name: site.name, url: siteUrl },
    ...(course.format.level ? { educationalLevel: course.format.level } : {}),
    teaches: course.learningObjectives,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      ...(hours ? { courseWorkload: `PT${hours}H` } : {}),
      ...(options.startDate ? { startDate: options.startDate } : {}),
    },
  };
}

export function courseListJsonLd(items: Course[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}${course.isFlagship ? "/flagship" : `/courses/${course.slug}`}`,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
