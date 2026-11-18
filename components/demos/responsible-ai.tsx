import { CheckCheck, Eye, Lock, ShieldCheck, type LucideIcon } from "lucide-react";
import { responsibleAi } from "@/data/explore";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";

/** Icons follow the order of `responsibleAi.principles`. */
const icons: LucideIcon[] = [CheckCheck, ShieldCheck, Lock, Eye];

/** Responsible-AI habits (academic integrity, data privacy, verification). */
export function ResponsibleAi() {
  return (
    <Section id="responsible-ai" aria-labelledby="responsible-title" tone="navy" className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid-navy mask-radial absolute inset-0 -z-10" />
      <SectionHeading id="responsible-title" tone="navy" eyebrow={responsibleAi.eyebrow} title={responsibleAi.title} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {responsibleAi.principles.map((principle, i) => (
          <li key={principle.title} className="rounded-card border border-navy-line bg-navy-raised/70 p-6">
            <IconTile icon={icons[i] ?? ShieldCheck} tone="navy" />
            <h3 className="mt-5 font-semibold text-on-navy">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">{principle.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
