import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { courses } from "@/data/courses";
import { recommendCourses } from "@/data/course-finder";
import { buildCourseSeedSql, COURSE_SEED_PATH } from "@/scripts/course-seed";

test("catalog has the 10 official courses with unique slugs", () => {
  assert.equal(courses.length, 10);
  assert.equal(new Set(courses.map((c) => c.slug)).size, 10);
  assert.equal(courses.filter((c) => c.isFlagship).length, 1);
});

test("workshops never get invented session counts or levels", () => {
  for (const slug of ["ai-in-daily-life", "ai-for-business-leaders"]) {
    const c = courses.find((x) => x.slug === slug)!;
    assert.equal(c.format.liveSessions, null);
    assert.equal(c.format.level, null);
  }
});

test("course seed migration matches data/courses.ts (regenerate with npm run db:seed:generate)", () => {
  assert.equal(readFileSync(COURSE_SEED_PATH, "utf8"), buildCourseSeedSql());
});

test("course finder recommends only catalog courses, best first", () => {
  const recs = recommendCourses({ role: ["leader"], goals: ["lead"], experience: ["some"], area: ["strategy"] });
  assert.equal(recs[0].course.slug, "ai-for-business-leaders");
  for (const r of recs) assert.ok(courses.includes(r.course));
});
