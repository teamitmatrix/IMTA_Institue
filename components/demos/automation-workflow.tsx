"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/utils/use-reduced-motion";
import { BrainCircuit, Check, GitFork, Inbox, Play, RotateCcw, Zap, type LucideIcon } from "lucide-react";
import { automationDemo, workflowSamples, workflowSteps, type WorkflowStepKey } from "@/data/automation-demo";
import { ExampleBadge } from "@/components/demos/example-badge";
import { cn } from "@/lib/utils/cn";

const stepIcons: Record<WorkflowStepKey, LucideIcon> = {
  trigger: Inbox,
  ai: BrainCircuit,
  decision: GitFork,
  action: Zap,
};

const STEP_MS = 900;

/**
 * Visual AI automation workflow (simulation). Each sample message has a
 * fixed, pre-written outcome — nothing is processed or sent.
 */
export function AutomationWorkflow() {
  const [sampleId, setSampleId] = useState(workflowSamples[0].id);
  /** -1 = not started; 0–3 = steps completed so far (inclusive). */
  const [progress, setProgress] = useState(-1);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  const sample = workflowSamples.find((s) => s.id === sampleId) ?? workflowSamples[0];
  const lastStep = workflowSteps.length - 1;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const run = () => {
    clearTimers();
    if (reduceMotion) {
      setProgress(lastStep);
      setRunning(false);
      return;
    }
    setRunning(true);
    setProgress(0);
    for (let i = 1; i <= lastStep; i++) {
      timers.current.push(setTimeout(() => setProgress(i), i * STEP_MS));
    }
    timers.current.push(setTimeout(() => setRunning(false), lastStep * STEP_MS + 100));
  };

  const chooseSample = (id: string) => {
    clearTimers();
    setRunning(false);
    setProgress(-1);
    setSampleId(id);
  };

  const status = progress < 0 ? "" : running ? `Running step ${progress + 1} of 4: ${workflowSteps[progress].title}` : "Simulation complete";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
      {/* Controls */}
      <div className="grid gap-6 border-b border-line bg-surface-muted p-5 sm:p-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <p id="sample-label" className="text-sm font-semibold text-ink">
              Choose a sample message
            </p>
            <ExampleBadge label="Simulation — sample data only" />
          </div>
          <div role="group" aria-labelledby="sample-label" className="mt-3 flex flex-wrap gap-2">
            {workflowSamples.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === sampleId}
                onClick={() => chooseSample(s.id)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                  s.id === sampleId
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <blockquote className="mt-4 rounded-xl border border-line bg-surface p-4 text-[0.95rem] leading-relaxed text-ink">
            <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-subtle">Sample message</p>
            <p>“{sample.message}”</p>
          </blockquote>
        </div>
        <div className="lg:col-span-5 lg:text-right">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-control bg-brand px-6 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgb(46_91_255/0.6)] transition-colors hover:bg-brand-hover disabled:opacity-60 sm:w-auto"
          >
            {progress === lastStep && !running ? (
              <RotateCcw aria-hidden className="size-4" />
            ) : (
              <Play aria-hidden className="size-4" />
            )}
            {progress === lastStep && !running ? "Run again" : running ? "Running…" : "Run simulation"}
          </button>
          <p className="mt-2 text-xs text-ink-subtle">{automationDemo.notice}</p>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {status}
      </p>

      {/* Workflow */}
      <ol className="relative grid gap-4 p-5 sm:p-6 lg:grid-cols-4 lg:gap-5">
        {workflowSteps.map((step, i) => {
          const Icon = stepIcons[step.key];
          const done = progress >= i;
          const active = running && progress === i;
          return (
            <li key={step.key} className="relative">
              {/* connector */}
              {i < lastStep ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-6 top-full h-4 w-px transition-colors duration-500 lg:left-auto lg:right-[-1.25rem] lg:top-9 lg:h-px lg:w-5",
                    progress > i ? "bg-brand" : "bg-line-strong",
                  )}
                />
              ) : null}

              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-4 transition-[border-color,box-shadow,background-color] duration-500",
                  active ? "border-brand bg-brand-soft/60 shadow-glow" : done ? "border-brand/40 bg-surface" : "border-line bg-surface",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-lg transition-colors duration-500",
                      done ? "bg-brand text-white" : "bg-surface-sunken text-ink-subtle",
                    )}
                  >
                    {done && !active ? <Check className="size-5" strokeWidth={2.25} /> : <Icon className="size-5" strokeWidth={1.75} />}
                  </span>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-subtle">{step.label}</p>
                    <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.description}</p>

                {/* Step output */}
                {done ? (
                  <div className="mt-4 rounded-lg border border-line bg-surface-muted p-3 text-sm">
                    {step.key === "trigger" ? (
                      <p className="text-ink-muted">
                        <span className="font-semibold text-ink">Received:</span> {sample.label.toLowerCase()} message
                      </p>
                    ) : null}
                    {step.key === "ai" ? (
                      <dl className="space-y-1.5">
                        <div>
                          <dt className="inline font-semibold text-ink">Summary: </dt>
                          <dd className="inline text-ink-muted">{sample.ai.summary}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink">Category: </dt>
                          <dd className="inline text-ink-muted">{sample.ai.category}</dd>
                        </div>
                        <div className="flex items-center gap-2">
                          <dt className="font-semibold text-ink">Urgency:</dt>
                          <dd
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-semibold",
                              sample.urgent ? "bg-danger-soft text-danger" : "bg-success-soft text-success",
                            )}
                          >
                            {sample.ai.urgency}
                          </dd>
                        </div>
                      </dl>
                    ) : null}
                    {step.key === "decision" ? (
                      <div className="flex flex-col gap-1.5" aria-label={`Decision: ${sample.urgent ? "yes, urgent" : "no, not urgent"}`}>
                        {[
                          { label: "Yes: act now", taken: sample.urgent },
                          { label: "No: queue for later", taken: !sample.urgent },
                        ].map((branch) => (
                          <span
                            key={branch.label}
                            className={cn(
                              "rounded-md border px-2.5 py-1.5 text-xs font-semibold",
                              branch.taken ? "border-brand bg-brand text-white" : "border-line text-ink-subtle line-through decoration-ink-subtle/40",
                            )}
                          >
                            {branch.label}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {step.key === "action" ? (
                      <ul className="space-y-1.5">
                        {sample.actions.map((action) => (
                          <li key={action} className="flex gap-2 text-ink-muted">
                            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.25} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
