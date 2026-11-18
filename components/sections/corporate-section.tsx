import { ArrowRight, Building, Presentation, Workflow, type LucideIcon } from "lucide-react";
import { forCompanies } from "@/data/teams";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal } from "@/components/interactive/reveal";

/** Icons follow the order of `forCompanies.offers`. */
const icons: LucideIcon[] = [Presentation, Building, Workflow];

/** Corporate training (BRD §E-9, §I). */
export function CorporateSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const Sub = headingAs === "h1" ? "h2" : "h3";
  return (
    <Section id="teams" aria-labelledby="teams-title" tone="navy" className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid-navy mask-radial absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -left-40 bottom-[-30%] -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(46_91_255/0.35),transparent)]"
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            as={headingAs}
            id="teams-title"
            tone="navy"
            eyebrow={forCompanies.eyebrow}
            title={forCompanies.heading}
            description={forCompanies.description}
          />
          <ButtonLink href={forCompanies.cta.href} variant="light" size="lg" className="mt-9">
            {forCompanies.cta.label}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </Reveal>

        <ul className="grid gap-4 lg:col-span-6">
          {forCompanies.offers.map((offer, i) => (
            <li key={offer.title}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-card border border-navy-line bg-navy-raised/70 p-5 backdrop-blur transition-colors duration-300 hover:border-brand/50 sm:p-6">
                  <IconTile icon={icons[i] ?? Workflow} tone="navy" />
                  <div>
                    <Sub className="font-semibold text-on-navy">{offer.title}</Sub>
                    <p className="mt-1 text-sm leading-relaxed text-on-navy-muted">{offer.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
