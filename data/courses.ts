import type { AudienceKey, Course, CourseFormat, CourseSlug } from "@/types/content";
import { flagship } from "@/data/flagship";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized course catalog — the single source for the grid, filters,
 * course pages, application form options, sitemap and structured data.
 *
 * Source: "institute.imta.io — Home.pdf" (BRD §F). Descriptions are localized
 * to US English (Analyse→Analyze, practise→practice, CV→resume).
 *
 * Rules:
 * - Never invent session counts or levels: leave them null when the PDF is silent.
 * - `learningObjectives` restate the official description as outcomes
 *   (flagship: its official curriculum). Do not add topics.
 * - `tools` lists only tools the PDF names for that course.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const baseFormat: Omit<CourseFormat, "duration"> = {
  liveSessions: null,
  sessionLength: null,
  schedule: null,
  level: null,
  experience: null,
  designedFor: null,
};

export const courses: Course[] = [
  {
    slug: "ai-for-professionals",
    name: "AI for Professionals",
    category: "Professionals",
    isFlagship: true,
    description:
      "Use AI for your real daily work: writing, spreadsheets, research and automation. Finish with a capstone built on your own job.",
    format: {
      ...baseFormat,
      duration: "4 weeks",
      liveSessions: 12,
      sessionLength: "2 hours each",
      schedule: "3 sessions a week",
      level: "Beginner to intermediate",
    },
    targetAudience: [...flagship.whoItsFor.items],
    learningObjectives: [
      "Understand what LLMs can and can't do, and where they fail",
      "Write prompts with role, context, examples and structured output",
      "Choose between ChatGPT, Claude, Gemini, Copilot and Perplexity for each task",
      "Use AI for emails, reports, proposals and presentations",
      "Analyze data and build charts in Excel and Sheets with AI",
      "Research fast, fact-check and avoid AI errors",
      "Build custom GPTs and projects trained on your work",
      "Connect your tools with no-code automation in Zapier, Make or n8n",
      "Use AI agents responsibly, with data privacy and company policy in mind",
      "Design an AI workflow for your own role and present it as your capstone",
      "Answer AI-skill interview questions and strengthen your resume and LinkedIn",
    ],
    tools: ["ChatGPT", "Claude", "Gemini", "Copilot", "Perplexity", "Excel", "Google Sheets", "Zapier", "Make", "n8n"],
    audiences: ["professionals", "leaders"],
  },
  {
    slug: "ai-for-job-seekers",
    name: "AI for Job Seekers: Interview Prep",
    category: "Job Seekers",
    isFlagship: false,
    description:
      "Prepare for interviews with AI. Rewrite your resume and LinkedIn, practice mock interviews with AI, and answer the AI-skill questions employers now ask.",
    format: { ...baseFormat, duration: "2 weeks", liveSessions: 6, level: "All levels" },
    targetAudience: ["Job seekers preparing for interviews", "Anyone updating their resume and LinkedIn profile"],
    learningObjectives: [
      "Prepare for interviews with AI",
      "Rewrite your resume and LinkedIn profile",
      "Practice mock interviews with AI",
      "Answer the AI-skill questions employers now ask",
    ],
    tools: ["LinkedIn"],
    audiences: ["students"],
  },
  {
    slug: "ai-for-students",
    name: "AI for Students",
    category: "Students",
    isFlagship: false,
    description:
      "Study smarter with AI: research, note-taking, exam prep and projects, used honestly and within your university's rules. Plus the AI skills that get you hired.",
    format: { ...baseFormat, duration: "3 weeks", liveSessions: 6, level: "Beginner" },
    targetAudience: ["Students, including university students", "Students who want AI skills that get them hired"],
    learningObjectives: [
      "Use AI for research and note-taking",
      "Prepare for exams and complete projects with AI",
      "Use AI honestly and within your university's rules",
      "Build the AI skills that get you hired",
    ],
    tools: [],
    audiences: ["students"],
  },
  {
    slug: "ai-in-daily-life",
    name: "AI in Daily Life",
    category: "Everyone",
    isFlagship: false,
    description:
      "A friendly start for anyone. Use AI for planning, learning, writing, shopping and travel, and know when not to trust it.",
    format: { ...baseFormat, duration: "1 weekend workshop", experience: "No experience needed" },
    targetAudience: ["Anyone curious about AI", "First-time AI users — no experience needed"],
    learningObjectives: [
      "Use AI for planning and learning",
      "Use AI for writing, shopping and travel",
      "Know when not to trust AI",
    ],
    tools: [],
    audiences: ["everyone", "students"],
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    category: "Core Skill",
    isFlagship: false,
    description:
      "Master the skill behind every AI tool. Write prompts that give reliable, structured results in ChatGPT, Claude, Gemini and Copilot, and build your own prompt library.",
    format: { ...baseFormat, duration: "2 weeks", liveSessions: 6, level: "All levels" },
    targetAudience: ["Anyone who uses AI tools, at any level", "People who want reliable, structured results from AI"],
    learningObjectives: [
      "Master the skill behind every AI tool",
      "Write prompts that give reliable, structured results",
      "Apply your prompts in ChatGPT, Claude, Gemini and Copilot",
      "Build your own prompt library",
    ],
    tools: ["ChatGPT", "Claude", "Gemini", "Copilot"],
    audiences: ["professionals", "students", "everyone"],
  },
  {
    slug: "ai-security-and-safety",
    name: "AI Security & Safety",
    category: "Security",
    isFlagship: false,
    description:
      "Spot deepfakes, AI voice scams and AI phishing. Protect your data when using AI at work, and understand the risks companies face as they adopt AI.",
    format: { ...baseFormat, duration: "2 weeks", liveSessions: 6, level: "All levels" },
    targetAudience: [
      "Anyone who wants to stay safe from AI scams",
      "Professionals using AI at work",
      "Teams at companies adopting AI",
    ],
    learningObjectives: [
      "Spot deepfakes, AI voice scams and AI phishing",
      "Protect your data when using AI at work",
      "Understand the risks companies face as they adopt AI",
    ],
    tools: [],
    audiences: ["professionals", "leaders", "everyone"],
  },
  {
    slug: "ai-automation-and-agents",
    name: "AI Automation & Agents",
    category: "Advanced",
    isFlagship: false,
    description:
      "Build custom AI assistants and no-code automations with tools like Zapier, Make and n8n that handle repetitive work for you.",
    format: { ...baseFormat, duration: "3 weeks", liveSessions: 9, level: "Intermediate" },
    targetAudience: ["Intermediate AI users", "Anyone who wants AI to handle repetitive work"],
    learningObjectives: [
      "Build custom AI assistants",
      "Build no-code automations with Zapier, Make and n8n",
      "Hand repetitive work over to automations",
    ],
    tools: ["Zapier", "Make", "n8n"],
    audiences: ["professionals"],
  },
  {
    slug: "ai-for-data-analysis",
    name: "AI for Data Analysis",
    category: "Data",
    isFlagship: false,
    description:
      "Analyze data, build reports and create charts with AI in Excel and Google Sheets, without writing code.",
    format: { ...baseFormat, duration: "3 weeks", liveSessions: 9, level: "Beginner to intermediate" },
    targetAudience: ["Anyone who works in Excel or Google Sheets", "People who want data skills without writing code"],
    learningObjectives: [
      "Analyze data with AI",
      "Build reports and create charts",
      "Work in Excel and Google Sheets with AI",
      "Do it all without writing code",
    ],
    tools: ["Excel", "Google Sheets"],
    audiences: ["professionals"],
  },
  {
    slug: "ai-for-marketing-and-content",
    name: "AI for Marketing & Content",
    category: "Marketing",
    isFlagship: false,
    description:
      "Plan campaigns and create posts, videos, images and ad copy with AI, while keeping your brand's voice.",
    format: { ...baseFormat, duration: "2 weeks", liveSessions: 6, level: "All levels" },
    targetAudience: ["Marketers and content creators", "Anyone responsible for a brand's voice"],
    learningObjectives: [
      "Plan campaigns with AI",
      "Create posts, videos, images and ad copy with AI",
      "Keep your brand's voice in everything AI helps you make",
    ],
    tools: [],
    audiences: ["professionals"],
  },
  {
    slug: "ai-for-business-leaders",
    name: "AI for Business Leaders",
    category: "Leaders",
    isFlagship: false,
    description:
      "AI strategy for decision-makers: where AI creates value, how to measure ROI, and how to roll it out safely across your company.",
    format: { ...baseFormat, duration: "1-day workshop", designedFor: "Managers and executives" },
    targetAudience: ["Managers and executives", "Decision-makers setting AI strategy"],
    learningObjectives: [
      "Identify where AI creates value in your company",
      "Measure the ROI of AI",
      "Roll AI out safely across your company",
    ],
    tools: [],
    audiences: ["leaders"],
  },
];

export const courseSlugs = courses.map((c) => c.slug) as [CourseSlug, ...CourseSlug[]];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function isWorkshop(course: Course): boolean {
  return /workshop/i.test(course.format.duration);
}

/** The level-like fact for a course: level, else experience, else "For …" audience. */
export function getCourseLevelLabel(course: Course): string | null {
  const { level, experience, designedFor } = course.format;
  if (level) return level;
  if (experience) return experience;
  if (designedFor) return `For ${designedFor.toLowerCase()}`;
  return null;
}

/** "4 weeks · 12 live sessions · Beginner to intermediate" — PDF meta line. */
export function formatCourseMeta(course: Course): string {
  return [
    course.format.duration,
    course.format.liveSessions !== null ? `${course.format.liveSessions} live sessions` : null,
    getCourseLevelLabel(course),
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * Course overview composed ONLY from catalog facts plus the PDF's statement
 * that "every course is live, practical and built around real tasks".
 */
export function getCourseOverview(course: Course): string[] {
  if (course.isFlagship) return [...flagship.paragraphs];

  const { duration, liveSessions, level, experience, designedFor } = course.format;
  const shape = isWorkshop(course)
    ? `${course.name} is a live online ${duration.replace(/^1 /, "")}`
    : `${course.name} is a ${duration.replace(/^(\d+) weeks?$/, "$1-week")} live online course with ${liveSessions} live sessions`;
  const who = level
    ? ` for ${level.toLowerCase() === "all levels" ? "all levels" : `${level.toLowerCase()} learners`}`
    : experience
      ? ` — ${experience.toLowerCase()}`
      : designedFor
        ? ` designed for ${designedFor.toLowerCase()}`
        : "";

  return [
    `${shape}${who}.`,
    "Like every IMTA AI Institute course, it is live, practical and built around real tasks — taught by people who build AI for real clients.",
  ];
}

/** Related courses: most shared audiences first, flagship as a tiebreaker. */
export function getRelatedCourses(course: Course, limit = 3): Course[] {
  return courses
    .filter((c) => c.slug !== course.slug)
    .map((c) => ({
      course: c,
      score: c.audiences.filter((a) => course.audiences.includes(a)).length * 10 + (c.isFlagship ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.course);
}

/**
 * Discovery filters (presentation only — they group the PDF's courses by the
 * audiences named in the PDF; course content is unchanged).
 */
export const audienceFilters: { key: AudienceKey | "all"; label: string }[] = [
  { key: "all", label: "All courses" },
  { key: "professionals", label: "Working professionals" },
  { key: "students", label: "Students & job seekers" },
  { key: "leaders", label: "Leaders & teams" },
  { key: "everyone", label: "Everyone" },
];

export const formatFilters = [
  { key: "all", label: "Any format" },
  { key: "multi-week", label: "Multi-week courses" },
  { key: "workshop", label: "Workshops" },
] as const;

export type FormatFilterKey = (typeof formatFilters)[number]["key"];
