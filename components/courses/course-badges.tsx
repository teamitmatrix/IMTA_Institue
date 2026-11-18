import type { Course } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

/** FLAGSHIP (solid) + category (soft) pills, shared by cards and course pages. */
export function CourseBadges({ course, className }: { course: Course; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {course.isFlagship ? <Badge variant="solid">Flagship</Badge> : null}
      <Badge>{course.category}</Badge>
    </div>
  );
}
