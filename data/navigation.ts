import type { NavItem } from "@/types/content";

/** Header nav from the PDF. Links target homepage anchors (BRD §D). */
export const mainNav: NavItem[] = [
  { label: "Courses", href: "/#courses" },
  { label: "Flagship", href: "/#flagship" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "For teams", href: "/#teams" },
  { label: "FAQ", href: "/#faq" },
  { label: "Explore AI", href: "/explore" },
];

export const applyHref = "/#apply";

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Popular courses",
    items: [
      { label: "AI for Students", href: "/courses/ai-for-students" },
      { label: "Prompt Engineering", href: "/courses/prompt-engineering" },
      { label: "AI Automation & Agents", href: "/courses/ai-automation-and-agents" },
      { label: "AI Interview Prep", href: "/courses/ai-for-job-seekers" },
      { label: "AI for Beginners", href: "/courses/ai-in-daily-life" },
    ],
  },
  {
    title: "Programs",
    items: [
      { label: "AI for Professionals", href: "/flagship" },
      { label: "All courses", href: "/courses" },
      { label: "Curriculum", href: "/flagship#curriculum" },
      { label: "For teams", href: "/for-teams" },
      { label: "Explore AI", href: "/explore" },
      { label: "Course finder", href: "/explore#course-finder" },
    ],
  },
  {
    title: "Institute",
    items: [
      { label: "About IMTA", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Apply", href: "/apply" },
    ],
  },
];

/** Build an apply link that preselects a course in the form (BRD FR-07). */
export function applyHrefFor(courseSlug: string): string {
  return `/apply?course=${encodeURIComponent(courseSlug)}`;
}
