import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/container";

const tones = {
  default: "bg-surface text-ink",
  muted: "bg-surface-muted text-ink",
  navy: "bg-navy text-on-navy",
} as const;

type SectionProps = ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  /** Set false to manage the inner layout yourself. */
  contained?: boolean;
};

/** Full-width page band with consistent vertical rhythm and background tone. */
export function Section({ tone = "default", contained = true, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
