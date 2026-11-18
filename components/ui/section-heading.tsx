import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** h1 on a page whose main subject is this section; h2 otherwise. */
  as?: "h1" | "h2";
  /** Pass to link the heading to its <section aria-labelledby>. */
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "navy";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  id,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone} className="mb-4">{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "font-semibold tracking-tight",
          tone === "navy" ? "text-on-navy" : "text-ink",
          Heading === "h1" ? "text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]" : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "navy" ? "text-on-navy-muted" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
