import type { SVGProps } from "react";

/**
 * Brand glyphs for the official social profiles. Lucide v1 ships no brand
 * icons, so these are inline (no extra requests) and inherit `currentColor`.
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21.95v-7.2h2.43l.37-2.82H13.5v-1.8c0-.82.23-1.37 1.4-1.37h1.5V6.24a20 20 0 0 0-2.18-.11c-2.16 0-3.64 1.32-3.64 3.74v2.06H8.14v2.82h2.44v7.2a10 10 0 1 1 2.92 0Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const;
