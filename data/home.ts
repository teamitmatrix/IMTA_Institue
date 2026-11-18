import type { Stat, TitledText } from "@/types/content";
import { site } from "@/data/site";

/** Homepage copy, verbatim from the PDF (BRD §E). */
export const hero = {
  eyebrow: "Live online AI courses · For professionals, students and everyone",
  heading: site.tagline,
  /** The headline split so the closing phrase can be highlighted; together they equal `heading`. */
  headingLead: "Practical AI skills for your career, your studies and ",
  headingAccent: "your daily life.",
  subheading: site.description,
  primaryCta: { label: "Explore courses", href: "/#courses" },
  secondaryCta: { label: "Apply now", href: "/#apply" },
};

export const stats: Stat[] = [
  { value: "10 courses", label: "for every level and goal" },
  { value: "Live", label: "small, hands-on online classes" },
  { value: "No code", label: "needed to start" },
  { value: "Certificate", label: "on completion of the capstone" },
];

export const whyNow = {
  eyebrow: "Why AI skills matter",
  heading: "AI won't replace professionals. Professionals who use AI will replace those who don't.",
  cards: [
    {
      title: "The work is changing",
      description:
        "Reports, emails, analysis and research that took hours now take minutes with the right AI workflow. Employers expect it.",
    },
    {
      title: "Hiring is changing",
      description:
        "Interviewers now ask how you use AI. Being able to show a real AI workflow from your own role sets you apart.",
    },
    {
      title: "Tutorials aren't enough",
      description:
        "Random videos teach tools. This program teaches you to apply AI to your actual job, with live guidance and feedback.",
    },
  ] satisfies TitledText[],
};

export const coursesIntro = {
  eyebrow: "Our courses",
  heading: "Find the AI course that fits where you are",
  description:
    "From your first prompt to building AI automations, every course is live, practical and built around real tasks.",
  cta: { label: "Apply for a course", href: "/#apply" },
};

export const applyIntro = {
  heading: "Get ahead of AI. Start with the next cohort.",
  description:
    "Seats are limited so every participant gets hands-on attention. Apply and our team will contact you within one business day.",
  submitLabel: "Submit application",
};
