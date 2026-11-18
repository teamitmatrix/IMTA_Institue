import { Briefcase, FileText, GraduationCap, type LucideIcon } from "lucide-react";
import { whyNow } from "@/data/home";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal } from "@/components/interactive/reveal";

/** Icons follow the order of `whyNow.cards`. */
const icons: LucideIcon[] = [FileText, Briefcase, GraduationCap];

/** "Why AI skills matter" (BRD §E-4). */
export function WhyAi() {
  return (
    <Section id="why" aria-labelledby="why-title" tone="default" className="pt-20 sm:pt-24 lg:pt-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="why-title" eyebrow={whyNow.eyebrow} title={whyNow.heading} />
        </Reveal>

        <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
          {whyNow.cards.map((card, i) => (
            <li key={card.title}>
              <Reveal delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-card lg:flex-row lg:items-start lg:gap-5">
                  <IconTile icon={icons[i] ?? FileText} />
                  <div>
                    <h3 className="flex items-baseline gap-3 text-lg font-semibold text-ink">
                      <span className="font-mono text-xs font-medium text-ink-subtle">0{i + 1}</span>
                      {card.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{card.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
