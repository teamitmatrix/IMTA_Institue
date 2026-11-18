import type { FaqItem } from "@/types/content";
import type { CohortConfig } from "@/types/content";
import { cohortFallbacks } from "@/data/site";

/** Five FAQs from the PDF, verbatim. [SESSION TIMES] is filled from cohort config (BRD §J). */
export const faqHeading = "Frequently asked questions";

/** FAQ items with [SESSION TIMES] filled from the current cohort (or the fallback). */
export function getFaqs(cohort: CohortConfig): FaqItem[] {
  return [
  {
    question: "Do I need coding or technical skills?",
    answer:
      "No. The program is built for non-technical professionals. If you can use email and a spreadsheet, you can do this course.",
  },
  {
    question: "What if I miss a session?",
    answer: "Every session is recorded, and you can bring questions to the next live class.",
  },
  {
    question: "Which AI tools will I need?",
    answer:
      "Most exercises work on the free versions of popular AI tools. We'll tell you exactly what to set up before Week 1.",
  },
  {
    question: "What time are the sessions?",
    answer: `Sessions are scheduled for each cohort's time zone. Current cohort timing: ${
      cohort.sessionTimes ?? cohortFallbacks.sessionTimes
    }.`,
  },
  {
    question: "Do you offer group or company pricing?",
    answer:
      "Yes. Groups and companies can enroll together or book a private program. Contact us for a quote.",
  },
  ];
}
