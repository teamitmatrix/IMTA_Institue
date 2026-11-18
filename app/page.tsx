import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { websiteJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { WhyAi } from "@/components/sections/why-ai";
import { ExploreTeaser } from "@/components/sections/explore-teaser";
import { CoursesSection } from "@/components/sections/courses-section";
import { FlagshipSection } from "@/components/sections/flagship-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { AudienceBenefits } from "@/components/sections/audience-benefits";
import { CorporateSection } from "@/components/sections/corporate-section";
import { AboutSection } from "@/components/sections/about-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ApplySection } from "@/components/sections/apply-section";

export const metadata = createPageMetadata({ ...pageSeo.home, path: "/", absoluteTitle: true });

/** Homepage — sections in BRD §E order. Each section is its own Server Component. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <WhyAi />
      <ExploreTeaser />
      <CoursesSection />
      <FlagshipSection />
      <CurriculumSection />
      <AudienceBenefits />
      <CorporateSection />
      <AboutSection />
      <FaqSection />
      <ApplySection />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
