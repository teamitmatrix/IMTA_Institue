import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "@/types/content";
import { CourseBadges } from "@/components/courses/course-badges";
import { CourseFacts } from "@/components/courses/course-facts";
import { Card } from "@/components/ui/card";

/**
 * Course card (BRD §F). The whole card is one link (stretched title link)
 * so there are no nested interactive elements.
 */
export function CourseCard({ course, headingLevel = "h3" }: { course: Course; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;

  return (
    <Card
      variant={course.isFlagship ? "highlighted" : "default"}
      interactive
      className="group relative flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <CourseBadges course={course} />
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-subtle transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <Heading className="mt-5 text-xl font-semibold tracking-tight text-ink">
        {/* prefetch: resolves the slug ahead of time from the static cache, so navigation is instant. */}
        <Link
          href={`/courses/${course.slug}`}
          prefetch
          className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
        >
          {course.name}
        </Link>
      </Heading>

      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">{course.description}</p>

      <CourseFacts course={course} className="mt-6 border-t border-line pt-5" />
    </Card>
  );
}
