"use client";

import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import type { AudienceKey, Course } from "@/types/content";
import { audienceFilters, formatFilters, isWorkshop, type FormatFilterKey } from "@/data/courses";
import { CourseCard } from "@/components/courses/course-card";
import { cn } from "@/lib/utils/cn";

type AudienceFilter = AudienceKey | "all";

type CourseExplorerProps = {
  courses: Course[];
  headingLevel?: "h2" | "h3";
  /** Adds search and format filters (used on /courses). */
  advanced?: boolean;
};

function matchesQuery(course: Course, query: string): boolean {
  if (!query) return true;
  const haystack = [course.name, course.category, course.description, ...course.tools, ...course.targetAudience]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/**
 * Course discovery (BRD §E-5). All cards are in the server-rendered HTML;
 * filtering is progressive enhancement.
 */
export function CourseExplorer({ courses, headingLevel, advanced = false }: CourseExplorerProps) {
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [format, setFormat] = useState<FormatFilterKey>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const visible = courses.filter(
    (c) =>
      (audience === "all" || c.audiences.includes(audience)) &&
      (format === "all" || (format === "workshop") === isWorkshop(c)) &&
      matchesQuery(c, query.trim()),
  );

  const filtersActive = audience !== "all" || format !== "all" || query.trim() !== "";
  const resetFilters = () => {
    setAudience("all");
    setFormat("all");
    setQuery("");
  };

  return (
    <div>
      {advanced ? (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor={searchId} className="sr-only">
              Search courses
            </label>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic or tool — e.g. interviews, Excel, Zapier"
              className="h-12 w-full rounded-control border border-line-strong bg-surface pl-11 pr-4 text-base text-ink shadow-card outline-none transition-[border-color,box-shadow] placeholder:text-ink-subtle/80 focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </div>
          <div role="group" aria-label="Filter by format" className="flex rounded-control border border-line-strong bg-surface p-1 shadow-card">
            {formatFilters.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={format === option.key}
                onClick={() => setFormat(option.key)}
                className={cn(
                  "h-10 flex-1 whitespace-nowrap rounded-[0.5rem] px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4",
                  format === option.key ? "bg-ink text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div role="group" aria-label="Filter courses by audience" className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {audienceFilters.map((option) => {
            const active = option.key === audience;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={active}
                onClick={() => setAudience(option.key)}
                className={cn(
                  "h-10 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-ink-subtle">
          {filtersActive
            ? `Showing ${visible.length} of ${courses.length} courses`
            : `Showing all ${courses.length} courses`}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-hover"
          >
            <X aria-hidden className="size-3.5" />
            Clear filters
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 rounded-card border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
          <p className="font-semibold text-ink">No courses match those filters.</p>
          <p className="mt-1 text-sm text-ink-muted">Try a different keyword or clear the filters to see all 10 courses.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex h-10 items-center rounded-control bg-ink px-4 text-sm font-semibold text-white hover:bg-ink/90"
          >
            Show all courses
          </button>
        </div>
      ) : (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            // Keyed by filter so cards replay a CSS entrance when results change.
            <li key={`${audience}-${format}-${course.slug}`} className="animate-fade-up">
              <CourseCard course={course} headingLevel={headingLevel} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
