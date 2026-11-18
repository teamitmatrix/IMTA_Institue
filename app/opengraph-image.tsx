import { renderOgCard, OG_SIZE } from "@/lib/seo/og-image";
import { site } from "@/data/site";

export const alt = `${site.name} — live online AI courses for students and professionals`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Default social card for every page without its own image. */
export default function Image() {
  return renderOgCard({
    eyebrow: "Live online AI courses",
    title: site.tagline,
    chips: ["10 courses", "Live, small classes", "No code needed"],
  });
}
