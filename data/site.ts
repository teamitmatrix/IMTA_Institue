import type { CohortConfig } from "@/types/content";

/**
 * Brand, contact and company facts from the BRD.
 * Items marked TBC still need confirmation from IMTA (BRD §L).
 */
export const site = {
  name: "IMTA AI Institute",
  logoBadge: "AI",
  tagline: "Practical AI skills for your career, your studies and your daily life.",
  description:
    "Hands-on AI courses taught live by people who build AI for real clients. Learn to use AI at work, ace AI-era job interviews, study smarter and stay safe from AI scams.",
  contactEmail: "institute@imta.io",
  parent: {
    name: "IMTA",
    // TBC: parent company URL is not in the PDF (BRD §L item 8).
    url: "https://imta.io",
  },
  locations: ["Pakistan", "Saudi Arabia", "USA"],
  copyright: "© 2026 IMTA. All rights reserved.",
} as const;

/**
 * Fallback cohort values, used when no published row exists in the
 * Supabase `cohort_information` table (or Supabase isn't configured).
 * Leave null until confirmed — the UI shows fallbacks
 * and never renders literal "[START DATE]" / "[YOUR PRICE]" / "[SESSION TIMES]".
 */
export const cohort: CohortConfig = {
  nextCohortStart: null,
  fee: null,
  sessionTimes: null,
};

export const cohortFallbacks = {
  nextCohortStart: "Announced soon",
  sessionTimes: "announced soon",
} as const;
