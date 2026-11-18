import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger amount (0–1): shifts when this element animates while scrolling in. */
  delay?: number;
  className?: string;
};

/**
 * Fade-and-rise as the element scrolls into view — pure CSS (scroll-driven
 * animations), so it ships ZERO JavaScript and stays a Server Component.
 * Unsupported browsers and prefers-reduced-motion users simply see the content.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style = delay ? ({ "--reveal-shift": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
