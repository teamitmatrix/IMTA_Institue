import { Award, Sparkles } from "lucide-react";
import { curriculum } from "@/data/curriculum";
import { LiveDot } from "@/components/ui/live-dot";

/**
 * Product-style panel built ONLY from real program content: the structured
 * prompting pattern taught in Session 2 and the 4-week path to the capstone.
 * Decorative for assistive tech (the same facts appear in the sections below).
 */
export function HeroVisual() {
  const promptSession = curriculum[0].sessions[1];
  const promptParts = ["Role", "Context", "Examples", "Structured output"];

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md select-none lg:max-w-none">
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgb(46_91_255/0.22),transparent)] blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-glow backdrop-blur">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-brand text-[0.65rem] font-bold text-white">AI</span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">AI for Professionals</p>
              <p className="font-mono text-[0.68rem] text-ink-subtle">4 weeks · 12 live sessions</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[0.68rem] font-semibold text-success">
            <LiveDot />
            Live online
          </span>
        </div>

        {/* prompt composer */}
        <div className="px-5 pt-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-subtle">
            Session {promptSession.number} · {promptSession.title}
          </p>
          <div className="mt-3 rounded-xl border border-line bg-surface-muted p-3.5">
            <div className="flex flex-wrap gap-1.5">
              {promptParts.map((part, i) => (
                <span
                  key={part}
                  className="inline-flex items-center gap-1.5 rounded-md border border-brand/15 bg-surface px-2 py-1 font-mono text-[0.7rem] text-brand-ink"
                >
                  <span className="text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {part}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
              <Sparkles className="size-4 text-brand" strokeWidth={1.75} />
              <span>Reliable, structured results</span>
              <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-brand" />
            </div>
          </div>
        </div>

        {/* 4-week path */}
        {/* extra bottom padding leaves room for the floating chip */}
        <div className="px-5 pb-12 pt-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-subtle">Your 4-week path</p>
          <ol className="mt-3 space-y-2">
            {curriculum.map((week) => (
              <li key={week.week} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[0.65rem] text-ink-muted">
                  {week.week}
                </span>
                <span className="flex-1 text-sm text-ink">{week.theme}</span>
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-sunken">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-glow"
                    style={{ width: `${week.week * 25}%` }}
                  />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* floating chip */}
      <div className="absolute -bottom-5 -left-3 flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-lift sm:-left-6">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
          <Award className="size-4" strokeWidth={1.75} />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-ink">Capstone demo day</p>
          <p className="text-[0.68rem] text-ink-subtle">Earn your certificate</p>
        </div>
      </div>
    </div>
  );
}
