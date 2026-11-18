"use client";

import { useEffect, type ReactNode } from "react";
import type { FieldValues, Path, PathValue, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { Check, CircleCheck, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

/**
 * Records when the form became interactive (client clock) for the server's
 * "too fast" spam check. Set on mount — never during the static prerender.
 */
export function useFormStartedAt<T extends FieldValues>(setValue: UseFormSetValue<T>) {
  useEffect(() => {
    setValue("startedAt" as Path<T>, Date.now() as PathValue<T, Path<T>>);
  }, [setValue]);
}

type ChoiceGroupProps = {
  legend: string;
  hint?: string;
  type: "radio" | "checkbox";
  options: readonly { value: string; label: string }[];
  register: UseFormRegisterReturn;
  selected: string[];
  error?: string;
  errorId: string;
};

/** Accessible radio/checkbox chips inside a fieldset with a real legend. */
export function ChoiceGroup({ legend, hint, type, options, register, selected, error, errorId }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-semibold text-ink">{legend}</legend>
      {hint ? <p className="mt-1 text-sm text-ink-subtle">{hint}</p> : null}
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center gap-2 rounded-control border px-4 text-sm font-medium transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2",
                checked ? "border-brand bg-brand-soft text-brand-ink" : "border-line-strong bg-surface text-ink hover:border-ink",
                error && !checked && "border-danger/60",
              )}
            >
              <input type={type} value={option.value} className="sr-only" aria-invalid={error ? true : undefined} {...register} />
              {type === "checkbox" ? (
                <span
                  aria-hidden
                  className={cn(
                    "grid size-4 place-items-center rounded border",
                    checked ? "border-brand bg-brand text-white" : "border-line-strong",
                  )}
                >
                  {checked ? <Check className="size-3" strokeWidth={3} /> : null}
                </span>
              ) : null}
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Honeypot input: hidden from people and assistive tech; bots tend to fill it. */
export function Honeypot({ id, register }: { id: string; register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" {...register} />
    </div>
  );
}

export function ServerError({ id, message }: { id: string; message: string }) {
  return (
    <div id={id} role="alert" className="flex gap-3 rounded-control border border-danger/20 bg-danger-soft p-4 text-sm text-danger">
      <CircleX aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export function SuccessPanel({
  title,
  children,
  actionLabel,
  onAction,
}: {
  title: string;
  children: ReactNode;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div role="status" className="flex flex-col items-center py-10 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-success-soft text-success">
        <CircleCheck aria-hidden className="size-7" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <div className="mt-2 max-w-sm text-ink-muted">{children}</div>
      <Button variant="outline" className="mt-7" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
