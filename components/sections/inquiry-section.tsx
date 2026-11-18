import { Clock, Mail, Building } from "lucide-react";
import { forCompanies } from "@/data/teams";
import { site } from "@/data/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CorporateInquiryForm } from "@/components/forms/corporate-inquiry-form";

/** Company training request (BRD §I) — a separate flow from course applications. */
export function InquirySection() {
  const { inquiry } = forCompanies;
  return (
    <Section id="inquiry" aria-labelledby="inquiry-title" tone="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="inquiry-title" eyebrow={inquiry.eyebrow} title={inquiry.title} description={inquiry.description} />
          <ul className="mt-9 space-y-4 text-ink-muted">
            <li className="flex items-center gap-3">
              <Building aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              Online or on-site, built around your tools and policies
            </li>
            <li className="flex items-center gap-3">
              <Clock aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              We reply within one business day
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="size-5 text-brand" strokeWidth={1.75} />
              <span>
                Prefer email?{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                >
                  {site.contactEmail}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-line bg-surface p-6 shadow-lift sm:p-9">
            <CorporateInquiryForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
