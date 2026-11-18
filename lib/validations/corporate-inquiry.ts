import * as z from "zod/mini";
import {
  countryField,
  emailField,
  nameField,
  optionalMessage,
  optionalText,
  spamTrapFields,
} from "@/lib/validations/shared";

export const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;

/** The PDF's three corporate offers (BRD §I). */
export const trainingInterests = [
  { value: "leadership_workshops", label: "Leadership AI workshops" },
  { value: "team_upskilling", label: "Team upskilling programs" },
  { value: "adoption_support", label: "AI adoption support" },
] as const;

/** "Delivered online or on-site" (BRD §I). */
export const deliveryPreferences = [
  { value: "online", label: "Online" },
  { value: "on_site", label: "On-site" },
  { value: "either", label: "Either / not sure" },
] as const;

export const corporateInquirySchema = z.object({
  companyName: nameField("your company name", 2, 150),
  contactName: nameField("your name"),
  workEmail: emailField,
  jobTitle: optionalText(100),
  country: countryField,
  companySize: z.enum(companySizes, { error: "Please choose your company size." }),
  trainingInterests: z
    .array(z.enum(["leadership_workshops", "team_upskilling", "adoption_support"]))
    .check(z.minLength(1, { error: "Please choose at least one option." }), z.maxLength(3)),
  deliveryPreference: z.enum(["online", "on_site", "either"], { error: "Please choose a delivery option." }),
  message: optionalMessage(2000),
  ...spamTrapFields,
});

export type CorporateInquiryInput = z.input<typeof corporateInquirySchema>;
export type CorporateInquiryData = z.output<typeof corporateInquirySchema>;
