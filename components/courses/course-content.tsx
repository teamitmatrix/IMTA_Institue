import { Check, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import type { Course } from "@/types/content";
import { getCourseOverview } from "@/data/courses";
import { flagship } from "@/data/flagship";
import { CheckList } from "@/components/ui/check-list";

function ContentBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Main column of a course page: overview, objectives, audience, tools (+ flagship benefits). */
export function CourseContent({ course }: { course: Course }) {
  return (
    <div className="space-y-10">
      <ContentBlock id="overview" title="Course overview">
        <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
          {getCourseOverview(course).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock id="objectives" title="What you'll learn">
        <ul className="grid gap-3 sm:grid-cols-2">
          {course.learningObjectives.map((objective) => (
            <li
              key={objective}
              className="flex gap-3 rounded-xl border border-line bg-surface-muted p-4 text-[0.95rem] leading-relaxed text-ink"
            >
              <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {objective}
            </li>
          ))}
        </ul>
      </ContentBlock>

      <ContentBlock id="audience" title="Who it's for">
        <CheckList items={course.targetAudience} />
      </ContentBlock>

      {course.isFlagship ? (
        <ContentBlock id="benefits" title={flagship.whatYouGet.title}>
          <CheckList items={flagship.whatYouGet.items} />
        </ContentBlock>
      ) : null}

      {course.tools.length > 0 ? (
        <ContentBlock id="tools" title="Tools you'll use">
          <ul className="flex flex-wrap gap-2">
            {course.tools.map((tool) => (
              <li
                key={tool}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-card"
              >
                <Wrench aria-hidden className="size-3.5 text-brand" strokeWidth={2} />
                {tool}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-subtle">Tools named in the official course description.</p>
        </ContentBlock>
      ) : null}
    </div>
  );
}
