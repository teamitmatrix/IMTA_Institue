import Link from "next/link";
import { ArrowRight, Briefcase, Compass, GraduationCap, Workflow, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/interactive/reveal";

const items: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: GraduationCap,
    title: "For students",
    description: "Research, notes, exam prep — and using AI honestly.",
    href: "/explore#students",
  },
  {
    icon: Briefcase,
    title: "For your career",
    description: "Resume bullets, LinkedIn and mock interview practice.",
    href: "/explore#careers",
  },
  {
    icon: Workflow,
    title: "For work",
    description: "Emails, reports, spreadsheets and a step-by-step automation walkthrough.",
    href: "/explore#productivity",
  },
  {
    icon: Compass,
    title: "Course finder",
    description: "Answer four quick questions to see which course fits you.",
    href: "/explore#course-finder",
  },
];

/** Homepage teaser linking to the interactive /explore experiences. */
export function ExploreTeaser() {
  return (
    <Section aria-labelledby="explore-teaser-title" className="pt-0 sm:pt-0 lg:pt-0">
      <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="explore-teaser-title"
          eyebrow="Try it yourself"
          title="See AI in action before you enroll"
          description="Walk through real-world examples for students, job seekers and professionals. Every example is pre-written for teaching — nothing is generated live."
        />
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.href}>
            <Reveal delay={i * 0.06} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
              >
                <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand ring-1 ring-inset ring-brand/10">
                  <item.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="mt-5 text-lg font-semibold text-ink">{item.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{item.description}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Explore
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
