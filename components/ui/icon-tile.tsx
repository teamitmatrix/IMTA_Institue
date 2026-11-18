import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const tones = {
  brand: "bg-brand-soft text-brand ring-brand/10",
  navy: "bg-white/5 text-brand-glow ring-white/10",
  ink: "bg-ink text-white ring-ink/10",
} as const;

type IconTileProps = {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: "sm" | "md";
  className?: string;
};

/** Rounded square holding a decorative icon. */
export function IconTile({ icon: Icon, tone = "brand", size = "md", className }: IconTileProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-xl ring-1 ring-inset",
        size === "md" ? "size-11" : "size-9",
        tones[tone],
        className,
      )}
    >
      <Icon className={size === "md" ? "size-5" : "size-[1.125rem]"} strokeWidth={1.75} />
    </span>
  );
}
