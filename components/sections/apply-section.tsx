import { Clock, Mail, Users } from "lucide-react";
import type { CourseSlug } from "@/types/content";
import { applyIntro } from "@/data/home";
import { site } from "@/data/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApplicationForm } from "@/components/forms/application-form";
import { Reveal } from "@/components/interactive/reveal";

/** Application section (BRD §E-12, §K). */
export function ApplySection({
  headingAs = "h2",
  defaultCourse,
}: {
  headingAs?: "h1" | "h2";
  /** Preselects a course in the form (used on course pages). */
  defaultCourse?: CourseSlug;
}) {
  return (
    <Section id="apply" aria-labelledby="apply-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            as={headingAs}
            id="apply-title"
            eyebrow="Apply"
            title={applyIntro.heading}
            description={applyIntro.description}
          />
          <ul className="mt-9 space-y-4 text-ink-muted">
            <li className="flex items-center gap-3">
              <Users aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              Limited seats for hands-on attention
            </li>
            <li className="flex items-center gap-3">
              <Clock aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              We reply within one business day
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              <span>
                Questions? Email{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                >
                  {site.contactEmail}
                </a>
              </span>
            </li>
          </ul>
        </Reveal>

        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-line bg-surface p-6 shadow-lift sm:p-9">
            <ApplicationForm defaultCourse={defaultCourse} />
          </div>
        </div>
      </div>
    </Section>
  );
}
