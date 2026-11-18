import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type EyebrowProps = ComponentProps<"p"> & { tone?: "light" | "navy" };

/** Small uppercase label above headings, with a short accent rule. */
export function Eyebrow({ tone = "light", className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] sm:text-xs",
        tone === "navy" ? "text-brand-glow" : "text-brand",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="h-px w-5 bg-current opacity-70" />
      <span>{children}</span>
    </p>
  );
}
