import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils/cn";
import logoMark from "@/public/images/logo1.jpeg";

/**
 * Official logo mark (public/images/logo1.jpeg) + wordmark.
 * The source image has wide padding, so it is scaled inside a rounded tile
 * to keep the mark legible at small sizes. next/image serves AVIF/WebP.
 */
export function Logo({
  className,
  inverted = false,
  preload = false,
}: {
  className?: string;
  inverted?: boolean;
  /** Preload only where the logo is above the fold (the header). */
  preload?: boolean;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-semibold", className)}>
      <span className="relative size-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-line">
        <Image src={logoMark} alt="" fill sizes="36px" preload={preload} className="scale-[1.65] object-cover" />
      </span>
      <span className={cn("text-[0.9375rem]", inverted ? "text-on-navy" : "text-ink")}>{site.name}</span>
    </Link>
  );
}
