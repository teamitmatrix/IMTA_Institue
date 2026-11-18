import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  /** Light tag pill used for course categories. */
  soft: "bg-brand-soft text-brand-ink",
  /** Solid pill used only for the FLAGSHIP badge. */
  solid: "bg-brand text-white",
} as const;

type BadgeProps = ComponentProps<"span"> & { variant?: keyof typeof variants };

export function Badge({ variant = "soft", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
