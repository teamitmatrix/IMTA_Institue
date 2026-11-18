import { Plus } from "lucide-react";
import { faqHeading, getFaqs } from "@/data/faq";
import { getFlagshipCohort } from "@/lib/data/cohort";
import { site } from "@/data/site";
import { faqPageJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/interactive/reveal";

/**
 * FAQ (BRD §J). Native <details>/<summary>: keyboard and screen-reader
 * accessible, works without JavaScript, and stays a Server Component.
 */
export async function FaqSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const faqs = getFaqs(await getFlagshipCohort());
  return (
    <Section id="faq" aria-labelledby="faq-title" tone="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeading as={headingAs} id="faq-title" eyebrow="FAQ" title={faqHeading} />
          <p className="mt-5 text-ink-muted">
            Still have a question? Email{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
            >
              {site.contactEmail}
            </a>
            .
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            {faqs.map((item, i) => (
              <details key={item.question} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-semibold text-ink transition-colors hover:bg-surface-muted sm:px-7 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white"
                  >
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 pr-16 leading-relaxed text-ink-muted sm:px-7 sm:pr-20">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      {/* Structured data only on /faq (the canonical FAQ page) to avoid duplicates. */}
      {headingAs === "h1" ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
    </Section>
  );
}
