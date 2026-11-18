import { Gift, Users } from "lucide-react";
import { flagship } from "@/data/flagship";
import { Section } from "@/components/ui/section";
import { CheckList } from "@/components/ui/check-list";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal } from "@/components/interactive/reveal";

/** "Who it's for" and "What you get" (BRD §E-8, §G). */
export function AudienceBenefits() {
  const columns = [
    { id: "who", icon: Users, ...flagship.whoItsFor },
    { id: "benefits", icon: Gift, ...flagship.whatYouGet },
  ];

  return (
    <Section aria-label="Who the program is for and what you get">
      <div className="grid gap-5 lg:grid-cols-2">
        {columns.map((col, i) => (
          <Reveal key={col.id} delay={i * 0.08} className="h-full">
            <div
              id={col.id}
              className="h-full rounded-2xl border border-line bg-gradient-to-b from-surface to-surface-muted p-7 shadow-card sm:p-9"
            >
              <div className="flex items-center gap-4">
                <IconTile icon={col.icon} />
                <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{col.title}</h2>
              </div>
              <CheckList items={col.items} className="mt-7" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
