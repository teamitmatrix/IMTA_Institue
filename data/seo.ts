import type { CourseSlug } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Search metadata (US English). One source for titles and descriptions.
 *
 * Rules:
 * - Titles ≈ 60 chars including the " | IMTA AI Institute" suffix.
 * - Descriptions ≈ 150–160 chars, written for real search intent
 *   (AI courses for students, beginners, careers, prompt engineering…).
 * - Facts only from the official catalog: no "best", rankings, ratings,
 *   prices or guarantees.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type PageSeo = { title: string; description: string };

/** Last meaningful content update — used for sitemap lastModified. */
export const CONTENT_UPDATED = "2026-11-18";

export const pageSeo = {
  home: {
    // Absolute title (no template suffix) for the homepage.
    title: "Online AI Courses for Students & Professionals | IMTA AI Institute",
    description:
      "Live online AI courses for students, beginners and professionals. Learn practical AI skills, prompt engineering and AI automation — no coding needed.",
  },
  courses: {
    title: "Online AI Courses for Beginners & Beyond",
    description:
      "Compare 10 live online AI courses: AI for students and beginners, prompt engineering, AI automation and agents, data analysis, marketing and AI career training.",
  },
  flagship: {
    title: "AI for Professionals: 4-Week Live AI Course",
    description:
      "A 4-week, 12-session live online AI training program. Use AI for writing, spreadsheets, research and automation, then build a capstone project on your own job.",
  },
  forTeams: {
    title: "AI Training for Teams and Companies",
    description:
      "Private artificial intelligence training for your team: leadership AI workshops, role-specific upskilling and AI adoption support, delivered online or on-site.",
  },
  faq: {
    title: "AI Course FAQ: Skills, Tools and Schedules",
    description:
      "Answers about our online AI courses: no coding skills needed, recorded sessions, which free AI tools you'll use, session times and group pricing for companies.",
  },
  apply: {
    title: "Apply for an Online AI Course",
    description:
      "Apply for a live online AI course in a few minutes. Choose your course, tell us about yourself, and our team will contact you within one business day.",
  },
  about: {
    title: "About Us: AI Training by Practitioners",
    description:
      "IMTA AI Institute is the training arm of IMTA, an AI solutions company with teams in the US, Saudi Arabia and Pakistan. Learn AI from people who build it.",
  },
  explore: {
    title: "AI Examples for Students & Beginners",
    description:
      "See how students and professionals use AI for research, notes, resumes, interviews, spreadsheets and automation — with responsible-use tips and a course finder.",
  },
} satisfies Record<string, PageSeo>;

/** Course pages — search-intent titles; the on-page H1 stays the official course name. */
export const courseSeo: Record<CourseSlug, PageSeo> = {
  "ai-for-professionals": {
    title: "AI for Professionals: Live Online AI Course",
    description:
      "Learn practical AI for your daily work — writing, spreadsheets, research and automation — in 12 live online sessions over 4 weeks, ending with a capstone project.",
  },
  "ai-for-job-seekers": {
    title: "AI Interview Prep Course for Job Seekers",
    description:
      "Live online AI career training: rewrite your resume and LinkedIn with AI, practice mock interviews and answer the AI-skill questions employers now ask.",
  },
  "ai-for-students": {
    title: "AI Course for College Students",
    description:
      "A beginner AI course for students: use AI for research, note-taking, exam prep and projects — honestly and within your university's rules. 3 weeks, live online.",
  },
  "ai-in-daily-life": {
    title: "AI for Beginners: Weekend Workshop",
    description:
      "A friendly live online AI workshop for beginners — no experience needed. Use AI for planning, learning, writing, shopping and travel, and know when not to trust it.",
  },
  "prompt-engineering": {
    title: "Prompt Engineering Course: Live & Online",
    description:
      "Learn prompt engineering in 6 live online sessions. Write prompts that give reliable, structured results in ChatGPT, Claude, Gemini and Copilot. All levels welcome.",
  },
  "ai-security-and-safety": {
    title: "AI Security & Safety Course",
    description:
      "Learn to spot deepfakes, AI voice scams and AI phishing, and protect your data when using AI at work. A 2-week live online course for all levels.",
  },
  "ai-automation-and-agents": {
    title: "AI Automation & Agents Course (No-Code)",
    description:
      "Build custom AI assistants and no-code automations with Zapier, Make and n8n. A 3-week, 9-session live online course for intermediate learners.",
  },
  "ai-for-data-analysis": {
    title: "AI for Data Analysis in Excel & Google Sheets",
    description:
      "Analyze data, build reports and create charts with AI in Excel and Google Sheets — no coding. 3 weeks, 9 live online sessions, beginner to intermediate.",
  },
  "ai-for-marketing-and-content": {
    title: "AI for Marketing & Content Course",
    description:
      "Plan campaigns and create posts, videos, images and ad copy with AI while keeping your brand's voice. A 2-week live online course for all levels.",
  },
  "ai-for-business-leaders": {
    title: "AI Strategy Workshop for Business Leaders",
    description:
      "A 1-day AI workshop for managers and executives: where AI creates value, how to measure ROI and how to roll AI out safely across your company.",
  },
};
