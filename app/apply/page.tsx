import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ApplySection } from "@/components/sections/apply-section";

export const metadata = createPageMetadata({ ...pageSeo.apply, path: "/apply" });

/** Application page (BRD §K). Supports ?course=<slug> preselection. */
export default function ApplyPage() {
  return <ApplySection headingAs="h1" />;
}
