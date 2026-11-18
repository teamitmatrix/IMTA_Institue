import type { CourseSlug } from "@/types/content";

/** Rich-text blocks for pre-written example responses. */
export type DemoBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "code"; text: string };

/** One turn in an example exchange. "example" turns are pre-written, never live AI. */
export type DemoTurn = { role: "you"; text: string } | { role: "example"; blocks: DemoBlock[] };

export type DemoIconKey =
  | "search"
  | "notebook"
  | "quiz"
  | "lightbulb"
  | "plan"
  | "shield"
  | "resume"
  | "linkedin"
  | "interview"
  | "growth"
  | "mail"
  | "report"
  | "sheet"
  | "research"
  | "workflow";

export interface DemoExample {
  id: string;
  title: string;
  icon: DemoIconKey;
  /** One-line situation, e.g. "Starting a history paper". */
  scenario: string;
  turns: DemoTurn[];
  /** Why the prompt works — the transferable lesson. */
  whyItWorks: string[];
  /** Responsible-use reminder for this example. */
  responsibleUse: string;
}

export interface DemoCategory {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Official catalog course that teaches this. */
  courseSlug: CourseSlug;
  examples: DemoExample[];
}
