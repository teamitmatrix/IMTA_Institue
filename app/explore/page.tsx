import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DemoCategory } from "@/types/demos";
import { demoCategories } from "@/data/demos";
import { automationDemo } from "@/data/automation-demo";
import { courseFinderIntro, explorePage } from "@/data/explore";
import { getCourseBySlug } from "@/data/courses";
import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { DemoNotice } from "@/components/demos/example-badge";
import { DemoExplorer } from "@/components/demos/demo-explorer";
import { AutomationWorkflow } from "@/components/demos/automation-workflow";
import { CourseFinder } from "@/components/demos/course-finder";
import { ResponsibleAi } from "@/components/demos/responsible-ai";

export const metadata = createPageMetadata({ ...pageSeo.explore, path: "/explore" });

function CourseLink({ slug, prefix }: { slug: Parameters<typeof getCourseBySlug>[0]; prefix: string }) {
  const course = getCourseBySlug(slug);
  if (!course) return null;
  return (
    <Link
      href={`/courses/${course.slug}`}
      prefetch
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover"
    >
      {prefix} {course.name}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function DemoSection({ category, tone }: { category: DemoCategory; tone: "default" | "muted" }) {
  return (
    <Section id={category.id} aria-labelledby={`${category.id}-title`} tone={tone}>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id={`${category.id}-title`}
          eyebrow={category.eyebrow}
          title={category.title}
          description={category.description}
        />
        <CourseLink slug={category.courseSlug} prefix="Learn this in" />
      </div>
      <DemoExplorer category={category} />
    </Section>
  );
}

/** Interactive learning experiences: three example demos, an automation simulation and a course finder. */
export default function ExplorePage() {
  return (
    <>
      <section aria-labelledby="explore-title" className="relative isolate overflow-hidden border-b border-line bg-surface">
        <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{explorePage.eyebrow}</Eyebrow>
            <h1 id="explore-title" className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {explorePage.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed">{explorePage.description}</p>
            <DemoNotice className="mt-8" />
            <nav aria-label="On this page" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {explorePage.jumpLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink-muted shadow-card transition-colors hover:border-line-strong hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {demoCategories.map((category, i) => (
        <DemoSection key={category.id} category={category} tone={i % 2 === 0 ? "muted" : "default"} />
      ))}

      <Section id="automation" aria-labelledby="automation-title" tone="muted">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="automation-title"
            eyebrow={automationDemo.eyebrow}
            title={automationDemo.title}
            description={`${automationDemo.description} Workflows like this are built with tools such as ${automationDemo.tools.join(", ")}.`}
          />
          <CourseLink slug={automationDemo.courseSlug} prefix="Build these in" />
        </div>
        <AutomationWorkflow />
      </Section>

      <ResponsibleAi />

      <Section id="course-finder" aria-labelledby="finder-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              id="finder-title"
              eyebrow={courseFinderIntro.eyebrow}
              title={courseFinderIntro.title}
              description={courseFinderIntro.description}
            />
          </div>
          <div className="lg:col-span-8">
            <CourseFinder />
          </div>
        </div>
      </Section>
    </>
  );
}
