import Link from "next/link";
import { mainNav, applyHref } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

/** Sticky site header (BRD FR-01). Server Component; only the mobile menu is client-side. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <Container className="flex h-header items-center justify-between gap-6">
        <Logo preload />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={applyHref} variant="dark" size="sm">
            Apply now
          </ButtonLink>
        </nav>

        <MobileNav items={mainNav} applyHref={applyHref} />
      </Container>
    </header>
  );
}
