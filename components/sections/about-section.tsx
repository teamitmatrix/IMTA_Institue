import { MapPin } from "lucide-react";
import { backedByImta, founder } from "@/data/about";
import { site } from "@/data/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/interactive/reveal";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/** About IMTA + founder introduction (BRD §E-10, §I). */
export function AboutSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const Sub = headingAs === "h1" ? "h2" : "h3";
  return (
    <Section id="about" aria-labelledby="about-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading as={headingAs} id="about-title" eyebrow={backedByImta.eyebrow} title={backedByImta.heading} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {backedByImta.body.before}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
            >
              {backedByImta.body.linkText}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {backedByImta.body.after}
          </p>
          <ul aria-label="IMTA team locations" className="mt-8 flex flex-wrap gap-2">
            {site.locations.map((location) => (
              <li
                key={location}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink"
              >
                <MapPin aria-hidden className="size-3.5 text-brand" strokeWidth={2} />
                {location}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <figure className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface-muted p-7 sm:p-9">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(46_91_255/0.16),transparent)]"
            />
            <Eyebrow>{founder.label}</Eyebrow>
            <div className="relative mt-6 flex items-center gap-5">
              {/* Initials avatar until a founder photo is supplied (BRD §L item 10). */}
              <span
                aria-hidden
                className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy to-brand text-xl font-semibold text-white shadow-lift"
              >
                {initials(founder.name)}
              </span>
              <div>
                <Sub className="text-2xl font-semibold tracking-tight text-ink">{founder.name}</Sub>
                <p className="mt-1 text-ink-subtle">{founder.title}</p>
              </div>
            </div>
            <p className="relative mt-6 leading-relaxed text-ink-muted">{founder.bio}</p>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
