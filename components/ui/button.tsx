import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  /** Blue — main conversion action ("Explore courses", "Submit application"). */
  primary: "bg-brand text-white shadow-[0_8px_24px_-8px_rgb(46_91_255/0.6)] hover:bg-brand-hover",
  /** Navy — header "Apply now", "Apply for a course". */
  dark: "bg-ink text-white hover:bg-ink/90",
  /** Outlined — secondary hero action. */
  outline: "border border-line-strong bg-surface text-ink hover:border-ink hover:bg-surface-muted",
  /** White — CTAs on navy bands ("Reserve your seat", "Talk to us about team training"). */
  light: "bg-white text-ink hover:bg-white/90",
  /** Outlined on navy. */
  "outline-navy": "border border-white/20 bg-transparent text-white hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
};

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

export function buttonClasses({ variant = "primary", size = "md", fullWidth }: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

type ButtonProps = StyleProps & ComponentProps<"button">;

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props} />;
}

type ButtonLinkProps = StyleProps & ComponentProps<typeof Link>;

/** A link styled as a button. Server-renderable; uses next/link for internal routes. */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props} />;
}
