import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { footerNav } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";

/** Site footer (BRD §E-13): link columns + the PDF's footer line. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-muted">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">{site.tagline}</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
          >
            <Mail aria-hidden className="size-4" strokeWidth={1.75} />
            {site.contactEmail}
          </a>
        </div>

        <div className="grid gap-10 sm:col-span-2 sm:grid-cols-3 lg:col-span-8">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-ink">{site.name}</span>
            {" · A part of "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
            >
              {site.parent.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {" · "}
            {site.locations.join(" · ")}
          </p>
          <p>{site.copyright}</p>
        </Container>
      </div>
    </footer>
  );
}
