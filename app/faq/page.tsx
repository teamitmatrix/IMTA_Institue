import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { FaqSection } from "@/components/sections/faq-section";
import { ApplySection } from "@/components/sections/apply-section";

export const metadata = createPageMetadata({ ...pageSeo.faq, path: "/faq" });

/** FAQ (BRD §J). FAQPage structured data is rendered by FaqSection. */
export default function FaqPage() {
  return (
    <>
      <FaqSection headingAs="h1" />
      <ApplySection />
    </>
  );
}
