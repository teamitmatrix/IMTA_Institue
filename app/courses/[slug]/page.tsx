import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, formatCourseMeta, getCourseBySlug } from "@/data/courses";
import { courseSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { courseJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";
import { Container } from "@/components/ui/container";
import { CourseHero } from "@/components/courses/course-hero";
import { CourseContent } from "@/components/courses/course-content";
import { EnrollCard } from "@/components/courses/enroll-card";
import { RelatedCourses } from "@/components/courses/related-courses";
import { MobileApplyBar } from "@/components/courses/mobile-apply-bar";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { ApplySection } from "@/components/sections/apply-section";

/**
 * `params` is read before streaming so unknown slugs return a real HTTP 404
 * (inside <Suspense> they would stream as a 200 "soft 404"). This route may
 * therefore block on navigation; course links use <Link prefetch> so it is
 * served from the static prefetch cache in practice.
 */
export const instant = false;

/** All 10 courses prerender at build time; unknown slugs hit notFound() below. */
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return createPageMetadata({
    ...courseSeo[course.slug],
    path: `/courses/${course.slug}`,
    // The flagship's full program page is /flagship; consolidate the duplicate there.
    canonicalPath: course.isFlagship ? "/flagship" : undefined,
    defaultImage: false, // this route has its own opengraph-image
  });
}

/**
 * Course detail page: hero, overview / objectives / audience / tools with a
 * sticky enrollment card, the flagship curriculum, related courses and an
 * application form preselected to this course.
 */
export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="pb-20 lg:pb-0">
      <CourseHero course={course} />

      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-8">
          <CourseContent course={course} />
        </div>
        <aside aria-label="Enrollment" className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)]">
            <EnrollCard course={course} />
          </div>
        </aside>
      </Container>

      {course.isFlagship ? <CurriculumSection /> : null}
      <RelatedCourses course={course} />
      <ApplySection defaultCourse={course.slug} />
      <MobileApplyBar courseName={course.name} meta={formatCourseMeta(course)} />
      {course.isFlagship ? null : <JsonLd data={courseJsonLd(course)} />}
    </div>
  );
}
