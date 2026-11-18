import { Award, BookOpen, CodeXml, Video, type LucideIcon } from "lucide-react";
import { stats } from "@/data/home";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";

/** Icons follow the order of `stats` in data/home.ts. */
const icons: LucideIcon[] = [BookOpen, Video, CodeXml, Award];

/** Four business highlights under the hero (BRD §E-3). */
export function Highlights() {
  return (
    <section aria-label="Program highlights" className="relative z-10 -mt-8 bg-transparent pb-4 sm:-mt-10">
      <Container>
        {/* gap-px over a line-colored background draws the dividers at every breakpoint */}
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lift lg:grid-cols-4">
          {stats.map((stat, i) => (
            <li key={stat.value} className="flex flex-col items-start gap-3 bg-surface p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6">
              <IconTile icon={icons[i] ?? BookOpen} />
              <div>
                <p className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{stat.value}</p>
                <p className="mt-0.5 text-sm text-ink-subtle">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
