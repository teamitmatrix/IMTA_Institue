/**
 * Generates the courses seed migration from data/courses.ts so the database
 * catalog can never drift from the site's catalog.
 *
 *   npm run db:seed:generate
 */
import { writeFileSync } from "node:fs";
import { buildCourseSeedSql, COURSE_SEED_PATH } from "@/scripts/course-seed";

writeFileSync(COURSE_SEED_PATH, buildCourseSeedSql());
console.log(`Wrote the course seed to ${COURSE_SEED_PATH}`);
