import type { CohortConfig } from "@/types/content";
import { cohortFallbacks } from "@/data/site";

/** AI for Professionals flagship program, verbatim from the PDF (BRD §G). */
export const flagship = {
  slug: "ai-for-professionals",
  eyebrow: "Flagship program",
  name: "AI for Professionals",
  paragraphs: [
    "A 4-week live cohort that takes you from AI basics to building your own AI workflows — finishing with a capstone project based on your real job and dedicated AI interview preparation.",
    "Bring your actual work tasks. Every session is hands-on, and you leave with templates, prompts and automations you keep using.",
  ],
  formatTitle: "Program format",
  cta: "Reserve your seat",
  whoItsFor: {
    title: "Who it's for",
    items: [
      "Professionals in operations, finance, marketing, HR, sales and admin",
      "Managers who want their teams working faster with AI",
      "Job seekers who want AI skills that stand out in interviews",
      "Anyone worried about AI and their job, who would rather get ahead of it",
    ],
  },
  whatYouGet: {
    title: "What you get",
    items: [
      "24 hours of live, hands-on sessions with recordings",
      "A prompt library and templates for everyday work",
      "Help applying AI to your own job tasks",
      "AI interview preparation and mock interviews",
      "An IMTA AI Institute certificate of completion",
    ],
  },
} as const;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Program format rows. Configurable placeholders resolve to fallbacks;
 * the Fee row is hidden until a price is set (BRD §L).
 */
export function getFlagshipFormat(cohort: CohortConfig): { label: string; value: string }[] {
  const rows = [
    { label: "Duration", value: "4 weeks" },
    { label: "Sessions", value: "12 live sessions · 2 hours each" },
    { label: "Schedule", value: "3 sessions a week" },
    { label: "Mode", value: "Live online, small cohort" },
    {
      label: "Next cohort",
      value: cohort.nextCohortStart
        ? dateFormatter.format(new Date(`${cohort.nextCohortStart}T00:00:00Z`))
        : cohortFallbacks.nextCohortStart,
    },
  ];

  if (cohort.fee) {
    rows.push({
      label: "Fee",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cohort.fee.currency,
        maximumFractionDigits: 0,
      }).format(cohort.fee.amount),
    });
  }

  return rows;
}
