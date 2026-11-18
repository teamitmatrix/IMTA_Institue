import { flagship } from "@/data/flagship";
import { pageSeo } from "@/data/seo";
import { createPageMetadata } from "@/lib/seo/metadata";
import { courseJsonLd } from "@/lib/seo/json-ld";
import { getCourseBySlug } from "@/data/courses";
import { getFlagshipCohort } from "@/lib/data/cohort";
import { JsonLd } from "@/components/ui/json-ld";
import { FlagshipSection } from "@/components/sections/flagship-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { AudienceBenefits } from "@/components/sections/audience-benefits";
import { ApplySection } from "@/components/sections/apply-section";

export const metadata = createPageMetadata({ ...pageSeo.flagship, path: "/flagship" });

/** Flagship program: overview + format, curriculum (#curriculum), audience and benefits, apply. */
export default async function FlagshipPage() {
  const course = getCourseBySlug(flagship.slug);
  const cohort = await getFlagshipCohort();
  return (
    <>
      <FlagshipSection headingAs="h1" />
      <CurriculumSection />
      <AudienceBenefits />
      <ApplySection />
      {course ? <JsonLd data={courseJsonLd(course, { path: "/flagship", startDate: cohort.nextCohortStart })} /> : null}
    </>
  );
}
