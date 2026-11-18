import { CalendarDays, Clock, Gauge, Timer, UserRound, Video, type LucideIcon } from "lucide-react";
import type { Course } from "@/types/content";
import { cn } from "@/lib/utils/cn";

type Fact = { key: string; label: string; value: string; icon: LucideIcon };

/** Only the facts the source states for this course — nothing is filled in. */
export function getCourseFacts(course: Course, { detailed = false } = {}): Fact[] {
  const f = course.format;
  const facts: (Fact | null)[] = [
    { key: "duration", label: "Duration", value: f.duration, icon: CalendarDays },
    f.liveSessions !== null
      ? { key: "sessions", label: "Live sessions", value: `${f.liveSessions} live sessions`, icon: Video }
      : null,
    detailed && f.sessionLength ? { key: "length", label: "Session length", value: f.sessionLength, icon: Timer } : null,
    detailed && f.schedule ? { key: "schedule", label: "Schedule", value: f.schedule, icon: Clock } : null,
    f.level ? { key: "level", label: "Level", value: f.level, icon: Gauge } : null,
    f.experience ? { key: "experience", label: "Experience", value: f.experience, icon: Gauge } : null,
    f.designedFor ? { key: "designedFor", label: "Designed for", value: f.designedFor, icon: UserRound } : null,
  ];
  return facts.filter((fact): fact is Fact => fact !== null);
}

/** Compact icon list of course facts (screen readers get the labels). */
export function CourseFacts({ course, className }: { course: Course; className?: string }) {
  return (
    <dl className={cn("grid gap-2 text-sm text-ink-muted", className)}>
      {getCourseFacts(course).map(({ key, label, value, icon: Icon }) => (
        <div key={key} className="flex items-center gap-2">
          <Icon aria-hidden className="size-4 shrink-0 text-ink-subtle" strokeWidth={1.75} />
          <dt className="sr-only">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
