import { Compass } from "lucide-react";
import { courses } from "@/data/courses";
import { coursesIntro } from "@/data/home";
import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { courseListJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { CourseExplorer } from "@/components/courses/course-explorer";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ApplySection } from "@/components/sections/apply-section";

export const metadata = createPageMetadata({ ...pageSeo.courses, path: "/courses" });

export default function CoursesPage() {
  return (
    <>
      <PageHeader eyebrow={coursesIntro.eyebrow} title={coursesIntro.heading} description={coursesIntro.description}>
        <ButtonLink href="/explore#course-finder" variant="outline">
          <Compass aria-hidden className="size-4" />
          Not sure? Take the 4-question course finder
        </ButtonLink>
      </PageHeader>
      <Section aria-label="Course catalog">
        <CourseExplorer courses={courses} headingLevel="h2" advanced />
      </Section>
      <ApplySection />
      <JsonLd data={courseListJsonLd(courses)} />
    </>
  );
}
