import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type CheckListProps = {
  items: readonly string[];
  tone?: "light" | "navy";
  className?: string;
};

/** Checkmark list used by "Who it's for" and "What you get". */
export function CheckList({ items, tone = "light", className }: CheckListProps) {
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3.5 leading-relaxed", tone === "navy" ? "text-on-navy-muted" : "text-ink-muted")}>
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              tone === "navy" ? "bg-white/10 text-brand-glow" : "bg-brand text-white",
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
