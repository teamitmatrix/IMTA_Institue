import type { Course, CourseSlug } from "@/types/content";
import { courses, getCourseBySlug } from "@/data/courses";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Course finder — rule-based recommendations from the official catalog.
 *
 * Transparent weights (no AI, no tracking): each answer adds points to
 * courses it fits. Answers stay in the browser and are never sent anywhere.
 * Weights reflect each course's official category, description and level.
 * ─────────────────────────────────────────────────────────────────────────────
 */

type Weights = Partial<Record<CourseSlug, number>>;

export interface FinderOption {
  value: string;
  label: string;
  hint?: string;
  weights: Weights;
}

export interface FinderQuestion {
  id: "role" | "goals" | "experience" | "area";
  title: string;
  description: string;
  multiple: boolean;
  /** Max selections for multiple-choice questions. */
  max?: number;
  options: FinderOption[];
}

export const finderQuestions: FinderQuestion[] = [
  {
    id: "role",
    title: "Which best describes you right now?",
    description: "Pick the closest match.",
    multiple: false,
    options: [
      {
        value: "student",
        label: "Student",
        hint: "High school, college or university",
        weights: { "ai-for-students": 3, "prompt-engineering": 1, "ai-in-daily-life": 1, "ai-for-job-seekers": 1 },
      },
      {
        value: "job-seeker",
        label: "Job seeker or recent graduate",
        hint: "Looking for your next role",
        weights: { "ai-for-job-seekers": 3, "ai-for-professionals": 1, "prompt-engineering": 1 },
      },
      {
        value: "professional",
        label: "Working professional",
        hint: "Operations, finance, marketing, HR, sales, admin…",
        weights: {
          "ai-for-professionals": 3,
          "prompt-engineering": 1,
          "ai-for-data-analysis": 1,
          "ai-for-marketing-and-content": 1,
          "ai-automation-and-agents": 1,
          "ai-security-and-safety": 1,
        },
      },
      {
        value: "leader",
        label: "Manager or executive",
        hint: "You lead a team or a company",
        weights: { "ai-for-business-leaders": 3, "ai-for-professionals": 2, "ai-security-and-safety": 1 },
      },
      {
        value: "curious",
        label: "Curious about AI for everyday life",
        hint: "No work or study goal in mind",
        weights: { "ai-in-daily-life": 3, "ai-security-and-safety": 2, "prompt-engineering": 1 },
      },
    ],
  },
  {
    id: "goals",
    title: "What do you want AI to help you with?",
    description: "Choose up to 3.",
    multiple: true,
    max: 3,
    options: [
      { value: "study", label: "Study smarter", weights: { "ai-for-students": 3 } },
      { value: "job", label: "Land a job and ace interviews", weights: { "ai-for-job-seekers": 3, "ai-for-professionals": 1 } },
      { value: "productivity", label: "Get more done at work", weights: { "ai-for-professionals": 3, "prompt-engineering": 1 } },
      { value: "automate", label: "Automate repetitive tasks", weights: { "ai-automation-and-agents": 3, "ai-for-professionals": 1 } },
      { value: "data", label: "Analyze data and build reports", weights: { "ai-for-data-analysis": 3, "ai-for-professionals": 1 } },
      { value: "content", label: "Create marketing content", weights: { "ai-for-marketing-and-content": 3 } },
      { value: "lead", label: "Lead AI adoption in my company", weights: { "ai-for-business-leaders": 3 } },
      { value: "safety", label: "Stay safe from AI scams", weights: { "ai-security-and-safety": 3, "ai-in-daily-life": 1 } },
      { value: "prompts", label: "Get better results from AI tools", weights: { "prompt-engineering": 3 } },
      { value: "everyday", label: "Use AI in daily life", weights: { "ai-in-daily-life": 3 } },
    ],
  },
  {
    id: "experience",
    title: "How much have you used AI tools?",
    description: "For example ChatGPT, Claude, Gemini or Copilot.",
    multiple: false,
    options: [
      {
        value: "new",
        label: "I'm new to AI",
        hint: "I've rarely or never used it",
        weights: { "ai-in-daily-life": 1, "ai-for-students": 1, "prompt-engineering": 1, "ai-automation-and-agents": -3 },
      },
      {
        value: "some",
        label: "I use it sometimes",
        hint: "A few times a month",
        weights: { "ai-for-professionals": 1 },
      },
      {
        value: "regular",
        label: "I use it regularly",
        hint: "I want to go further",
        weights: { "ai-automation-and-agents": 2, "ai-for-professionals": 1 },
      },
    ],
  },
  {
    id: "area",
    title: "Which area of AI interests you most?",
    description: "It's fine to pick “Not sure yet”.",
    multiple: false,
    options: [
      {
        value: "writing",
        label: "Writing and communication",
        weights: { "ai-for-professionals": 1, "ai-for-marketing-and-content": 1, "prompt-engineering": 1, "ai-for-job-seekers": 1 },
      },
      { value: "data", label: "Data and spreadsheets", weights: { "ai-for-data-analysis": 3 } },
      { value: "automation", label: "Automation and AI agents", weights: { "ai-automation-and-agents": 3 } },
      { value: "security", label: "Security and safety", weights: { "ai-security-and-safety": 3 } },
      { value: "strategy", label: "Strategy and leadership", weights: { "ai-for-business-leaders": 3 } },
      { value: "prompting", label: "Prompting fundamentals", weights: { "prompt-engineering": 3 } },
      { value: "unsure", label: "Not sure yet", weights: { "ai-for-professionals": 1, "prompt-engineering": 1, "ai-in-daily-life": 1 } },
    ],
  },
];

export type FinderAnswers = Partial<Record<FinderQuestion["id"], string[]>>;

export interface Recommendation {
  course: Course;
  score: number;
  /** Plain-language reasons, from the answers that pointed to this course. */
  reasons: string[];
  /** Optional caution, e.g. an intermediate course for someone new to AI. */
  note?: string;
}

const reasonPrefix: Record<FinderQuestion["id"], string> = {
  role: "Fits your role:",
  goals: "Matches your goal:",
  experience: "Suits your experience:",
  area: "Covers your interest:",
};

/** Score every course and return the best 1–3 matches, best first. */
export function recommendCourses(answers: FinderAnswers): Recommendation[] {
  const totals = new Map<CourseSlug, { score: number; reasons: string[] }>();

  for (const question of finderQuestions) {
    for (const value of answers[question.id] ?? []) {
      const option = question.options.find((o) => o.value === value);
      if (!option) continue;
      for (const [slug, weight] of Object.entries(option.weights) as [CourseSlug, number][]) {
        const entry = totals.get(slug) ?? { score: 0, reasons: [] };
        entry.score += weight;
        if (weight >= 2) {
          entry.reasons.push(`${reasonPrefix[question.id]} ${option.label}`);
        }
        totals.set(slug, entry);
      }
    }
  }

  const isNew = answers.experience?.includes("new");

  const ranked = courses
    .map((course) => {
      const entry = totals.get(course.slug) ?? { score: 0, reasons: [] };
      const note =
        isNew && course.format.level === "Intermediate"
          ? "This is an intermediate course. If you're new to AI, consider starting with Prompt Engineering or AI in Daily Life."
          : undefined;
      return { course, score: entry.score, reasons: entry.reasons, note };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.course.isFlagship) - Number(a.course.isFlagship));

  if (ranked.length === 0) {
    const fallback = getCourseBySlug("prompt-engineering");
    return fallback ? [{ course: fallback, score: 0, reasons: ["A great first course for any goal"] }] : [];
  }

  // Best match plus up to two more that score at least half as well.
  const best = ranked[0].score;
  return ranked.filter((r, i) => i === 0 || r.score >= best / 2).slice(0, 3);
}
