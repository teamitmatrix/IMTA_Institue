import type { CurriculumWeek } from "@/types/content";

/** Flagship curriculum — fixed at 4 weeks / 12 sessions (BRD §H). Verbatim from the PDF. */
export const curriculumHeading = "12 sessions. Four weeks. One real AI workflow for your job.";

export const curriculum: CurriculumWeek[] = [
  {
    week: 1,
    theme: "AI Foundations",
    sessions: [
      { number: 1, title: "How modern AI works", description: "what LLMs can and can't do, and where they fail" },
      { number: 2, title: "Prompting that works", description: "role, context, examples and structured output" },
      {
        number: 3,
        title: "Your AI toolkit",
        description: "ChatGPT, Claude, Gemini, Copilot and Perplexity, and when to use each",
      },
    ],
  },
  {
    week: 2,
    theme: "AI at Your Desk",
    sessions: [
      { number: 4, title: "Writing & communication", description: "emails, reports, proposals and presentations" },
      { number: 5, title: "Data & spreadsheets", description: "Excel and Sheets with AI, analysis and charts" },
      { number: 6, title: "Research & decisions", description: "fast research, fact-checking and avoiding AI errors" },
    ],
  },
  {
    week: 3,
    theme: "Automation & Agents",
    sessions: [
      { number: 7, title: "Custom AI assistants", description: "build GPTs and projects trained on your work" },
      { number: 8, title: "No-code automation", description: "connect your tools with Zapier, Make or n8n" },
      {
        number: 9,
        title: "AI agents & responsible use",
        description: "agents in practice, data privacy and company policy",
      },
    ],
  },
  {
    week: 4,
    theme: "Career & Capstone",
    sessions: [
      { number: 10, title: "Your AI workflow", description: "design an AI system for your own role" },
      {
        number: 11,
        title: "AI interview prep",
        description: "answer AI-skill questions, mock interviews, resume and LinkedIn",
      },
      { number: 12, title: "Capstone demo day", description: "present your workflow and earn your certificate" },
    ],
  },
];
