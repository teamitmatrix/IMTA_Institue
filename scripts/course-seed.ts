import { courses } from "@/data/courses";

export const COURSE_SEED_PATH = "supabase/migrations/20261118000800_seed_courses.sql";

const lit = (value: string | number | boolean | null): string => {
  if (value === null) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return `'${value.replace(/'/g, "''")}'`;
};

const rows = courses.map((c, i) => {
  const f = c.format;
  return `  (${[
    lit(c.slug),
    lit(c.name),
    lit(c.category),
    lit(c.isFlagship),
    lit(c.description),
    lit(f.duration),
    lit(f.liveSessions),
    lit(f.sessionLength),
    lit(f.schedule),
    lit(f.level),
    lit(f.experience),
    lit(f.designedFor),
    lit(i + 1),
  ].join(", ")})`;
});

export function buildCourseSeedSql(): string {
  return `-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: the 10 official courses. GENERATED from data/courses.ts by
-- scripts/generate-course-seed.ts — do not edit by hand.
-- NULL = not stated in the source PDF (never invented).
-- Idempotent: re-running updates existing rows.
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.courses
  (slug, name, category, is_flagship, description, duration, live_sessions,
   session_length, schedule, level, experience, designed_for, sort_order)
values
${rows.join(",\n")}
on conflict (slug) do update set
  name           = excluded.name,
  category       = excluded.category,
  is_flagship    = excluded.is_flagship,
  description    = excluded.description,
  duration       = excluded.duration,
  live_sessions  = excluded.live_sessions,
  session_length = excluded.session_length,
  schedule       = excluded.schedule,
  level          = excluded.level,
  experience     = excluded.experience,
  designed_for   = excluded.designed_for,
  sort_order     = excluded.sort_order;
`;
}
