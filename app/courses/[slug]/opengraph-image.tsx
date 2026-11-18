import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courses";
import { getCourseFacts } from "@/components/courses/course-facts";
import { renderOgCard, OG_SIZE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "IMTA AI Institute course";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

/** Per-course social card: official name, category and stated facts only. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return renderOgCard({
    eyebrow: `${course.isFlagship ? "Flagship · " : ""}${course.category} · Live online`,
    title: course.name,
    chips: getCourseFacts(course).map((fact) => fact.value),
  });
}
