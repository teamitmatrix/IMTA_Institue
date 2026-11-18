import { ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";
import { coursesIntro } from "@/data/home";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseExplorer } from "@/components/courses/course-explorer";
import { Reveal } from "@/components/interactive/reveal";

/** Course discovery (BRD §E-5): all 10 courses with audience filters. */
export function CoursesSection() {
  return (
    <Section id="courses" aria-labelledby="courses-title" tone="muted">
      <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="courses-title"
          eyebrow={coursesIntro.eyebrow}
          title={coursesIntro.heading}
          description={coursesIntro.description}
        />
        <ButtonLink href={coursesIntro.cta.href} variant="dark" className="self-start lg:self-auto">
          {coursesIntro.cta.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover/button:translate-x-0.5" />
        </ButtonLink>
      </Reveal>

      <div className="mt-12">
        <CourseExplorer courses={courses} />
      </div>

      <div className="mt-10 flex justify-center">
        <ButtonLink href="/courses" variant="outline">
          Search and compare all courses
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover/button:translate-x-0.5" />
        </ButtonLink>
      </div>
    </Section>
  );
}
