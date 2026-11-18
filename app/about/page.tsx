import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { AboutSection } from "@/components/sections/about-section";
import { CorporateSection } from "@/components/sections/corporate-section";

export const metadata = createPageMetadata({ ...pageSeo.about, path: "/about" });

/** About IMTA + founder (BRD §I). */
export default function AboutPage() {
  return (
    <>
      <AboutSection headingAs="h1" />
      <CorporateSection />
    </>
  );
}
