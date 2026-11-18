import type { CourseSlug } from "@/types/content";

/**
 * AI automation workflow demo — a SIMULATION with pre-written outcomes.
 * No messages are read, classified or sent; each sample has a fixed result.
 */

export type WorkflowStepKey = "trigger" | "ai" | "decision" | "action";

export const workflowSteps: { key: WorkflowStepKey; label: string; title: string; description: string }[] = [
  {
    key: "trigger",
    label: "1 · Trigger",
    title: "A new message arrives",
    description: "Something happens that starts the workflow — here, a new message lands in a shared support inbox.",
  },
  {
    key: "ai",
    label: "2 · AI processing",
    title: "AI reads and labels it",
    description: "An AI step summarizes the message, picks a category and estimates urgency.",
  },
  {
    key: "decision",
    label: "3 · Decision",
    title: "Is it urgent?",
    description: "A simple rule checks the AI's urgency label and chooses a path.",
  },
  {
    key: "action",
    label: "4 · Automated action",
    title: "The right thing happens",
    description: "The workflow takes action automatically — and a person reviews anything sent to customers.",
  },
];

export interface WorkflowSample {
  id: string;
  label: string;
  message: string;
  ai: { summary: string; category: string; urgency: "High" | "Low" };
  urgent: boolean;
  actions: string[];
}

export const workflowSamples: WorkflowSample[] = [
  {
    id: "login",
    label: "Login problem",
    message: "Hi, our whole team can't log in to the portal and we have a client demo in an hour!",
    ai: { summary: "Team locked out of the portal before a client demo.", category: "Access issue", urgency: "High" },
    urgent: true,
    actions: ["Alert the on-call teammate in the team chat", "Create a high-priority support ticket"],
  },
  {
    id: "invoice",
    label: "Invoice request",
    message: "Could you send me the invoice for last month when you get a chance? Thanks!",
    ai: { summary: "Customer requests last month's invoice.", category: "Billing", urgency: "Low" },
    urgent: false,
    actions: ["Add to the billing team's daily queue", "Draft a reply for a person to review and send"],
  },
  {
    id: "feedback",
    label: "Product feedback",
    message: "Love the new dashboard — any plans to add a dark mode?",
    ai: { summary: "Positive feedback with a feature request (dark mode).", category: "Feedback", urgency: "Low" },
    urgent: false,
    actions: ["Log the request in the product feedback sheet", "Send an automatic thank-you note"],
  },
];

export const automationDemo = {
  eyebrow: "AI automation demo",
  title: "How an AI workflow works",
  description:
    "Automations connect your tools so routine work happens on its own. Pick a sample message and run the simulation to see each step.",
  tools: ["Zapier", "Make", "n8n"],
  courseSlug: "ai-automation-and-agents" satisfies CourseSlug,
  notice: "Simulation with sample messages — nothing is read, classified or sent.",
};
