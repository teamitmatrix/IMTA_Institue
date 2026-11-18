"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ChartBar,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Mail,
  MessagesSquare,
  NotebookPen,
  Route,
  Search,
  ShieldCheck,
  Sheet,
  Eye,
  TrendingUp,
  UserRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { DemoCategory, DemoIconKey } from "@/types/demos";
import { ExampleBadge } from "@/components/demos/example-badge";
import { ExampleBlocks } from "@/components/demos/example-blocks";
import { cn } from "@/lib/utils/cn";

const icons: Record<DemoIconKey, LucideIcon> = {
  search: Search,
  notebook: NotebookPen,
  quiz: ListChecks,
  lightbulb: Lightbulb,
  plan: Route,
  shield: ShieldCheck,
  resume: FileText,
  linkedin: UserRound,
  interview: MessagesSquare,
  growth: TrendingUp,
  mail: Mail,
  report: ChartBar,
  sheet: Sheet,
  research: GraduationCap,
  workflow: Workflow,
};

/**
 * Tabbed explorer of pre-written AI examples. Keyboard: arrow keys move
 * between examples, Home/End jump to first/last (WAI-ARIA tabs pattern).
 */
export function DemoExplorer({ category }: { category: DemoCategory }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const example = category.examples[activeIndex];
  const [firstTurn, ...laterTurns] = example.turns;
  const prompt = firstTurn.role === "you" ? firstTurn.text : "";

  const select = (index: number, focus = false) => {
    setActiveIndex(index);
    setRevealed(false);
    setCopied(false);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = category.examples.length - 1;
    const keyMap: Record<string, number> = {
      ArrowDown: activeIndex === last ? 0 : activeIndex + 1,
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? last : activeIndex - 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      select(keyMap[event.key], true);
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Example list */}
      <div
        role="tablist"
        aria-label={`${category.title} examples`}
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {category.examples.map((ex, i) => {
          const Icon = icons[ex.icon];
          const active = i === activeIndex;
          return (
            <button
              key={ex.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onTabKeyDown}
              className={cn(
                "flex min-w-[15rem] shrink-0 items-start gap-3 rounded-xl border p-3.5 text-left transition-colors duration-200 lg:min-w-0",
                active
                  ? "border-brand/50 bg-surface shadow-glow"
                  : "border-line bg-surface/60 hover:border-line-strong hover:bg-surface",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
                  active ? "bg-brand text-white" : "bg-brand-soft text-brand",
                )}
              >
                <Icon className="size-[1.125rem]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{ex.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-subtle">{ex.scenario}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Example panel */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(activeIndex)}
        tabIndex={0}
        className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift lg:col-span-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-muted px-5 py-3.5 sm:px-6">
          <h3 className="text-base font-semibold text-ink">{example.title}</h3>
          <ExampleBadge />
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Prompt */}
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-navy p-4 text-on-navy sm:max-w-[85%]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-on-navy-muted">Example prompt</p>
              <button
                type="button"
                onClick={copyPrompt}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-on-navy-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                {copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
                {copied ? "Copied" : "Copy prompt"}
              </button>
            </div>
            <p className="text-[0.95rem] leading-relaxed">{prompt}</p>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? "Prompt copied to clipboard" : ""}
          </p>

          {/* Pre-written response(s) */}
          {!revealed ? (
            <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-line-strong p-5">
              <button
                type="button"
                onClick={() => {
                  setRevealed(true);
                  // The button disappears; move focus to the revealed example.
                  requestAnimationFrame(() => responseRef.current?.focus());
                }}
                className="inline-flex h-10 items-center gap-2 rounded-control bg-brand px-4 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(46_91_255/0.6)] transition-colors hover:bg-brand-hover"
              >
                <Eye aria-hidden className="size-4" />
                Show example response
              </button>
              <p className="text-xs text-ink-subtle">Pre-written by our team to illustrate a good result.</p>
            </div>
          ) : (
            <div ref={responseRef} tabIndex={-1} aria-label="Example response" className="space-y-4 outline-none">
                {laterTurns.map((turn, i) => (
                  <div key={`${example.id}-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
                    {turn.role === "example" ? (
                      <div className="max-w-[95%] rounded-2xl rounded-tl-md border border-line bg-surface-muted p-4 sm:max-w-[90%]">
                        <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-ink-subtle">
                          Example response
                        </p>
                        <ExampleBlocks blocks={turn.blocks} />
                      </div>
                    ) : (
                      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-navy p-4 text-on-navy">
                        <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-on-navy-muted">
                          Your reply
                        </p>
                        <p className="text-[0.95rem] leading-relaxed">{turn.text}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Lesson */}
        <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
          <div className="bg-surface p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Lightbulb aria-hidden className="size-4 text-brand" strokeWidth={2} />
              Why this prompt works
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              {example.whyItWorks.map((point) => (
                <li key={point} className="flex gap-2">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck aria-hidden className="size-4 text-success" strokeWidth={2} />
              Use it responsibly
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{example.responsibleUse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
