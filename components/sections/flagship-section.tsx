import { ArrowRight, Video } from "lucide-react";
import { flagship } from "@/data/flagship";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramFormatCard } from "@/components/sections/program-format-card";
import { Reveal } from "@/components/interactive/reveal";

/** Flagship AI for Professionals + Program format (BRD §E-6/7, §G). */
export function FlagshipSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <Section id="flagship" aria-labelledby="flagship-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <SectionHeading
            as={headingAs}
            id="flagship-title"
            eyebrow={flagship.eyebrow}
            title={flagship.name}
          />
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted">
            {flagship.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="inline-flex items-center gap-2.5 text-sm font-medium text-ink">
              <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand">
                <Video aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
              {flagship.whatYouGet.items[0]}
            </p>
            <a
              href="#curriculum"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
            >
              See the 12-session curriculum
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <ProgramFormatCard titleAs={headingAs === "h1" ? "h2" : "h3"} />
        </Reveal>
      </div>
    </Section>
  );
}
