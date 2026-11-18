import { ArrowRight, Mail } from "lucide-react";
import type { Course } from "@/types/content";
import { site } from "@/data/site";
import { getFlagshipFormat } from "@/data/flagship";
import { getFlagshipCohort } from "@/lib/data/cohort";
import { ButtonLink } from "@/components/ui/button";
import { LiveDot } from "@/components/ui/live-dot";
import { getCourseFacts } from "@/components/courses/course-facts";

/**
 * Enrollment card for course pages. Shows only stated facts; the flagship
 * also shows its configurable cohort/fee rows (BRD §G, §L).
 */
export async function EnrollCard({ course }: { course: Course }) {
  const facts = getCourseFacts(course, { detailed: true });
  const cohortRows = course.isFlagship
    ? getFlagshipFormat(await getFlagshipCohort()).filter((row) => row.label === "Next cohort" || row.label === "Fee")
    : [];

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-lift sm:p-7">
      <p className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
        <LiveDot />
        Live online{course.isFlagship ? ", small cohort" : ""}
      </p>

      <dl className="mt-5 divide-y divide-line">
        {facts.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between gap-4 py-3">
            <dt className="flex items-center gap-2.5 text-sm text-ink-subtle">
              <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              {label}
            </dt>
            <dd className="text-right text-sm font-semibold text-ink">
              {key === "sessions" ? value.replace(" live sessions", "") : value}
            </dd>
          </div>
        ))}
        {cohortRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm text-ink-subtle">{row.label}</dt>
            <dd className="text-right text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <ButtonLink href="#apply" size="lg" fullWidth className="mt-6">
        Apply for this course
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover/button:translate-x-0.5" />
      </ButtonLink>
      <p className="mt-3 text-center text-xs text-ink-subtle">Our team will contact you within one business day.</p>

      <a
        href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Question about ${course.name}`)}`}
        className="mt-5 flex items-center justify-center gap-2 border-t border-line pt-5 text-sm font-semibold text-ink hover:text-brand"
      >
        <Mail aria-hidden className="size-4" strokeWidth={1.75} />
        Ask a question
      </a>
    </div>
  );
}
