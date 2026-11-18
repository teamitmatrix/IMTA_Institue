import { ArrowRight } from "lucide-react";
import type { Course } from "@/types/content";
import { getRelatedCourses } from "@/data/courses";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";

export function RelatedCourses({ course }: { course: Course }) {
  const related = getRelatedCourses(course);

  return (
    <Section aria-labelledby="related-title" tone="muted">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="related-title" eyebrow="Keep exploring" title="Related courses" />
        <ButtonLink href="/courses" variant="outline" className="self-start sm:self-auto">
          View all courses
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((c) => (
          <li key={c.slug}>
            <CourseCard course={c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
