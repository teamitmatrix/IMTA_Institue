import { BookOpenCheck } from "lucide-react";
import { demoNotice } from "@/data/demos";
import { cn } from "@/lib/utils/cn";

/** Persistent label marking content as a pre-written educational example (never live AI). */
export function ExampleBadge({ className, label = demoNotice.short }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[0.72rem] font-semibold text-amber-900",
        className,
      )}
    >
      <BookOpenCheck aria-hidden className="size-3.5" strokeWidth={2} />
      {label}
    </span>
  );
}

/** Page-level notice explaining that all demos are simulated. */
export function DemoNotice({ className }: { className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950",
        className,
      )}
    >
      <BookOpenCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-700" strokeWidth={1.75} />
      <p>
        <span className="font-semibold">Educational examples, not live AI. </span>
        {demoNotice.long}
      </p>
    </div>
  );
}
