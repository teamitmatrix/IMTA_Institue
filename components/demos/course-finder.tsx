"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Compass, Info, Lock, RotateCcw } from "lucide-react";
import { finderQuestions, recommendCourses, type FinderAnswers } from "@/data/course-finder";
import { applyHrefFor } from "@/data/navigation";
import { buttonClasses } from "@/components/ui/button";
import { CourseBadges } from "@/components/courses/course-badges";
import { CourseFacts } from "@/components/courses/course-facts";
import { cn } from "@/lib/utils/cn";

const TOTAL = finderQuestions.length;

/**
 * Interactive course finder. Rule-based scoring over the official catalog;
 * answers live only in component state — nothing is stored or sent.
 */
export function CourseFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef(false);

  // Move focus to the new question/results heading after navigation (not on first render).
  useEffect(() => {
    if (hasInteracted.current) headingRef.current?.focus();
  }, [step]);

  const go = (next: number) => {
    hasInteracted.current = true;
    setStep(next);
  };

  const isResults = step >= TOTAL;
  const question = finderQuestions[Math.min(step, TOTAL - 1)];
  const selected = answers[question.id] ?? [];
  const canContinue = selected.length > 0;

  const toggle = (value: string) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      if (!question.multiple) return { ...prev, [question.id]: [value] };
      if (current.includes(value)) return { ...prev, [question.id]: current.filter((v) => v !== value) };
      if (question.max && current.length >= question.max) return prev;
      return { ...prev, [question.id]: [...current, value] };
    });
  };

  const restart = () => {
    setAnswers({});
    go(0);
  };

  if (isResults) {
    const recommendations = recommendCourses(answers);
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-lift sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-brand">
              <Compass aria-hidden className="size-3.5" />
              Your results
            </p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-semibold tracking-tight text-ink outline-none sm:text-3xl">
              {recommendations.length > 1 ? "Courses that fit you" : "A course that fits you"}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Suggested by simple matching rules (not AI) using your answers and our official course catalog. Our team can help you choose when you apply.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => go(0)} className={buttonClasses({ variant: "outline", size: "sm" })}>
              Edit answers
            </button>
            <button type="button" onClick={restart} className={buttonClasses({ variant: "outline", size: "sm" })}>
              <RotateCcw aria-hidden className="size-3.5" />
              Start over
            </button>
          </div>
        </div>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {recommendations.map((rec, i) => (
            <li
              key={rec.course.slug}
              className={cn(
                "flex flex-col rounded-xl border p-5",
                i === 0 ? "border-brand/60 bg-brand-soft/40 shadow-glow sm:col-span-2" : "border-line bg-surface",
              )}
            >
              <p className={cn("text-xs font-semibold uppercase tracking-wider", i === 0 ? "text-brand-ink" : "text-ink-subtle")}>
                {i === 0 ? "Best match" : "Also consider"}
              </p>
              <CourseBadges course={rec.course} className="mt-3" />
              <h4 className="mt-3 text-lg font-semibold tracking-tight text-ink">{rec.course.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{rec.course.description}</p>
              <CourseFacts course={rec.course} className="mt-4" />

              {rec.reasons.length > 0 ? (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Why it fits</p>
                  <ul className="mt-2 space-y-1.5">
                    {rec.reasons.slice(0, 3).map((reason) => (
                      <li key={reason} className="flex gap-2 text-sm text-ink-muted">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.25} />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {rec.note ? (
                <p className="mt-4 flex gap-2 rounded-lg bg-surface-muted p-3 text-xs leading-relaxed text-ink-muted">
                  <Info aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  {rec.note}
                </p>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <Link href={`/courses/${rec.course.slug}`} prefetch className={buttonClasses({ variant: i === 0 ? "primary" : "dark", size: "sm" })}>
                  View course
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
                <Link href={applyHrefFor(rec.course.slug)} className={buttonClasses({ variant: "outline", size: "sm" })}>
                  Apply
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-subtle">
          <Lock aria-hidden className="size-3.5" />
          Your answers stay on this page. We don&apos;t save or send them.
        </p>
      </div>
    );
  }

  const InputType = question.multiple ? "checkbox" : "radio";
  const atMax = question.multiple && question.max !== undefined && selected.length >= question.max;

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-lift sm:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-ink-subtle">
          Question {step + 1} of {TOTAL}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-ink-subtle">
          <Lock aria-hidden className="size-3.5" />
          No sign-up. Nothing is saved.
        </p>
      </div>
      <div aria-hidden className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-glow transition-[width] duration-500 ease-out-soft"
          style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
        />
      </div>

      <form
        className="mt-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (canContinue) go(step + 1);
        }}
      >
        <fieldset>
          <legend className="contents">
            <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-ink outline-none sm:text-[1.75rem]">
              {question.title}
            </h3>
          </legend>
          <p className="mt-2 text-sm text-ink-muted">
            {question.description}
            {question.multiple ? <span className="sr-only"> {selected.length} selected.</span> : null}
          </p>

          <div className={cn("mt-6 grid gap-3", question.options.length > 5 ? "sm:grid-cols-2" : "sm:grid-cols-1 md:grid-cols-2")}>
            {question.options.map((option) => {
              const checked = selected.includes(option.value);
              const disabled = !checked && atMax;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                    checked ? "border-brand bg-brand-soft/50" : "border-line hover:border-line-strong",
                    disabled && "cursor-not-allowed opacity-50",
                    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2",
                  )}
                >
                  <input
                    type={InputType}
                    name={question.id}
                    value={option.value}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggle(option.value)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors",
                      question.multiple ? "rounded-md" : "rounded-full",
                      checked ? "border-brand bg-brand text-white" : "border-line-strong bg-surface",
                    )}
                  >
                    {checked ? (
                      question.multiple ? (
                        <Check className="size-3" strokeWidth={3} />
                      ) : (
                        <span className="size-2 rounded-full bg-white" />
                      )
                    ) : null}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{option.label}</span>
                    {option.hint ? <span className="mt-0.5 block text-xs text-ink-subtle">{option.hint}</span> : null}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className={cn(buttonClasses({ variant: "outline" }), step === 0 && "invisible")}
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
          <button type="submit" disabled={!canContinue} className={buttonClasses()}>
            {step === TOTAL - 1 ? "See my courses" : "Next"}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
