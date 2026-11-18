import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  default: "border-line bg-surface shadow-card",
  highlighted: "border-brand/60 bg-surface shadow-glow",
  navy: "border-navy-line bg-navy-raised/80 text-on-navy",
  muted: "border-transparent bg-surface-muted",
} as const;

type CardProps = ComponentProps<"div"> & {
  variant?: keyof typeof variants;
  /** Adds hover lift — use only on clickable cards. */
  interactive?: boolean;
};

/** Rounded bordered surface used for course, week, offer and founder cards. */
export function Card({ variant = "default", interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border p-6",
        variants[variant],
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift",
        className,
      )}
      {...props}
    />
  );
}
