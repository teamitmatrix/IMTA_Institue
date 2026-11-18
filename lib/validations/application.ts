import * as z from "zod/mini";
import { courseSlugs } from "@/data/courses";
import { countryField, emailField, nameField, optionalMessage, spamTrapFields } from "@/lib/validations/shared";

export const learnerStatuses = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Professional" },
] as const;

/**
 * Application form schema (BRD §K + backend requirements). Shared by React
 * Hook Form on the client and the Server Action, which re-validates.
 */
export const applicationSchema = z.object({
  fullName: nameField("your full name"),
  email: emailField,
  currentRole: nameField("your current role", 1),
  course: z.enum(courseSlugs, { error: "Please choose a course." }),
  country: countryField,
  learnerStatus: z.enum(["student", "professional"], { error: "Please choose student or professional." }),
  message: optionalMessage(1000),
  ...spamTrapFields,
});

export type ApplicationInput = z.input<typeof applicationSchema>;
export type ApplicationData = z.output<typeof applicationSchema>;
