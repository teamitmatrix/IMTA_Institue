import { cn } from "@/lib/utils/cn";

/** Pulsing indicator that signals live instruction (pulse disabled for reduced motion). */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2", className)}>
      <span className="absolute inset-0 rounded-full bg-success [animation:pulse-ring_1.8s_var(--ease-out-soft)_infinite]" />
      <span className="relative inline-flex size-2 rounded-full bg-success" />
    </span>
  );
}
