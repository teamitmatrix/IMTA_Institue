import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CorporateSection } from "@/components/sections/corporate-section";
import { AboutSection } from "@/components/sections/about-section";
import { InquirySection } from "@/components/sections/inquiry-section";

export const metadata = createPageMetadata({ ...pageSeo.forTeams, path: "/for-teams" });

/** Corporate training (BRD §I). */
export default function ForTeamsPage() {
  return (
    <>
      <CorporateSection headingAs="h1" />
      <InquirySection />
      <AboutSection />
    </>
  );
}
