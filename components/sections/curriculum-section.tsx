import { Award } from "lucide-react";
import { curriculum, curriculumHeading } from "@/data/curriculum";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/interactive/reveal";
import { cn } from "@/lib/utils/cn";

/** Four-week, 12-session curriculum (BRD §H). Order and wording are fixed. */
export function CurriculumSection() {
  const lastWeek = curriculum.length;

  return (
    <Section id="curriculum" aria-labelledby="curriculum-title" tone="muted">
      <Reveal>
        <SectionHeading id="curriculum-title" eyebrow="Curriculum" title={curriculumHeading} className="max-w-3xl" />
      </Reveal>

      <div className="relative mt-14">
        {/* progress rail (desktop) */}
        <div aria-hidden className="absolute left-0 right-0 top-[1.125rem] hidden h-px bg-line-strong lg:block">
          <div className="h-full w-full bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-50" />
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {curriculum.map((week, i) => {
            const isCapstone = week.week === lastWeek;
            return (
              <li key={week.week}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="relative mb-5 flex items-center gap-3">
                      <span
                        className={cn(
                          "relative z-10 grid size-9 place-items-center rounded-full border font-mono text-sm font-medium",
                          isCapstone
                            ? "border-brand bg-brand text-white shadow-[0_0_0_6px_rgb(46_91_255/0.12)]"
                            : "border-line-strong bg-surface text-ink",
                        )}
                      >
                        {week.week}
                      </span>
                      <span className="relative z-10 bg-surface-muted pr-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle">
                        Week {week.week}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex flex-1 flex-col rounded-card border bg-surface p-6 shadow-card",
                        isCapstone ? "border-brand/50" : "border-line",
                      )}
                    >
                      <h3 className="text-lg font-semibold text-ink">{week.theme}</h3>
                      <ol className="mt-5 space-y-4">
                        {week.sessions.map((session) => (
                          <li key={session.number} className="flex gap-3">
                            <span className="mt-0.5 grid h-6 min-w-6 place-items-center rounded-md bg-surface-sunken px-1 font-mono text-[0.7rem] font-medium text-ink-muted">
                              {String(session.number).padStart(2, "0")}
                            </span>
                            <p className="text-sm leading-relaxed text-ink-muted">
                              <span className="font-semibold text-ink">{session.title}</span> — {session.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                      {isCapstone ? (
                        <p className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-brand-ink">
                          <Award aria-hidden className="size-4" strokeWidth={1.75} />
                          Certificate of completion
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
