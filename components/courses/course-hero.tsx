import type { Course } from "@/types/content";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CourseBadges } from "@/components/courses/course-badges";
import { getCourseFacts } from "@/components/courses/course-facts";

/** Course page header: breadcrumbs, badges, title, official description, key facts. */
export function CourseHero({ course }: { course: Course }) {
  const facts = getCourseFacts(course);

  return (
    <section aria-labelledby="course-title" className="relative isolate overflow-hidden border-b border-line bg-surface-muted">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(46_91_255/0.14),transparent)]"
      />
      <Container className="pb-14 pt-8 sm:pb-16 lg:pb-20">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: course.name, path: `/courses/${course.slug}` },
          ]}
        />

        <div className="mt-10 max-w-3xl">
          <CourseBadges course={course} />
          <h1
            id="course-title"
            className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          >
            {course.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed">{course.description}</p>

          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Course facts">
            {facts.map(({ key, label, value, icon: Icon }) => (
              <li
                key={key}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-card"
              >
                <Icon aria-hidden className="size-4 text-brand" strokeWidth={1.75} />
                <span className="sr-only">{label}: </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
