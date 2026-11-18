import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const controlClasses =
  "block h-12 w-full rounded-control border border-line-strong bg-surface px-4 text-base text-ink shadow-card outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-subtle/70 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Label + control + error wrapper. The control must set
 * aria-describedby={`${id}-error`} and aria-invalid when `error` is present.
 */
export function Field({ id, label, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
