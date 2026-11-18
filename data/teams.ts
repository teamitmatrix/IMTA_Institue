import type { TitledText } from "@/types/content";

/** Corporate training section, verbatim from the PDF (BRD §I). */
export const forCompanies = {
  eyebrow: "For companies",
  heading: "Train your whole team on AI",
  description:
    "Private programs and workshops built around your company's tools, data policies and daily work, from one-day leadership workshops to multi-week team programs. Delivered online or on-site.",
  offers: [
    { title: "Leadership AI workshops", description: "AI strategy and adoption for decision-makers" },
    { title: "Team upskilling programs", description: "Role-specific training for every department" },
    { title: "AI adoption support", description: "Training, then IMTA builds the AI systems your team needs" },
  ] satisfies TitledText[],
  cta: {
    label: "Talk to us about team training",
    href: "/for-teams#inquiry",
  },
  inquiry: {
    eyebrow: "Team training request",
    title: "Tell us about your team",
    description:
      "Share a few details and our team will contact you within one business day to discuss a private program for your company.",
  },
};
