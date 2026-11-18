/**
 * Content model for the IMTA AI Institute site.
 * All business copy lives in /data and is typed here, so UI components
 * never hard-code content (BRD FR-03).
 */

export type CourseSlug =
  | "ai-for-professionals"
  | "ai-for-job-seekers"
  | "ai-for-students"
  | "ai-in-daily-life"
  | "prompt-engineering"
  | "ai-security-and-safety"
  | "ai-automation-and-agents"
  | "ai-for-data-analysis"
  | "ai-for-marketing-and-content"
  | "ai-for-business-leaders";

export type AudienceKey = "professionals" | "students" | "leaders" | "everyone";

/**
 * Format facts. Only what the source states: session count, level,
 * experience and "designed for" are null where the PDF does not give them.
 */
export interface CourseFormat {
  /** e.g. "4 weeks", "1 weekend workshop". */
  duration: string;
  /** Number of live sessions; null where the PDF does not state one (workshops). */
  liveSessions: number | null;
  /** Flagship only: "2 hours each". */
  sessionLength: string | null;
  /** Flagship only: "3 sessions a week". */
  schedule: string | null;
  /** e.g. "Beginner to intermediate"; null where not specified. */
  level: string | null;
  /** AI in Daily Life: "No experience needed". */
  experience: string | null;
  /** AI for Business Leaders: "Managers and executives". */
  designedFor: string | null;
}

export interface Course {
  slug: CourseSlug;
  /** Exact course name from the PDF. */
  name: string;
  /** Category tag from the PDF, rendered uppercase. */
  category: string;
  isFlagship: boolean;
  /** Official description (US English). */
  description: string;
  format: CourseFormat;
  /** Who it's for — taken from the PDF's tags, descriptions and flagship "Who it's for". */
  targetAudience: string[];
  /** The official description broken into outcomes (flagship: from its curriculum). */
  learningObjectives: string[];
  /** Tools named in the source for this course; empty when none are named. */
  tools: string[];
  /** Discovery filter groups (presentation only). */
  audiences: AudienceKey[];
}

export interface CurriculumSession {
  number: number;
  title: string;
  description: string;
}

export interface CurriculumWeek {
  week: number;
  theme: string;
  sessions: CurriculumSession[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TitledText {
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** Placeholders from the PDF that must be configured before launch (BRD §L). */
export interface CohortConfig {
  /** ISO date (YYYY-MM-DD) of the next flagship cohort. PDF: [START DATE]. */
  nextCohortStart: string | null;
  /** Flagship fee. PDF: [YOUR PRICE]. */
  fee: { amount: number; currency: string } | null;
  /** Human-readable session times incl. time zone. PDF: [SESSION TIMES]. */
  sessionTimes: string | null;
}
