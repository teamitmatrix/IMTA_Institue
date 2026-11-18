import * as z from "zod/mini";
import { countryCodes } from "@/data/countries";

/**
 * Shared field rules used by every public form (client and server).
 * Written with `zod/mini` (tree-shakable) because these schemas ship to the
 * browser for instant validation; the server re-validates with the same rules.
 */

export const nameField = (label: string, min = 2, max = 100) =>
  z.string({ error: `Please enter ${label}.` }).check(
    z.trim(),
    z.minLength(min, { error: `Please enter ${label}.` }),
    z.maxLength(max, { error: `Must be ${max} characters or fewer.` }),
  );

/** Trimmed + lowercased so duplicates are detected case-insensitively. */
export const emailField = z.pipe(
  z.string({ error: "Please enter your email address." }).check(
    z.trim(),
    z.toLowerCase(),
    z.minLength(1, { error: "Please enter your email address." }),
    z.maxLength(254, { error: "Email must be 254 characters or fewer." }),
  ),
  z.email({ error: "Please enter a valid email address." }),
);

export const countryField = z.enum(countryCodes, { error: "Please choose your country." });

const MAX_LINKS = 2;

/** Optional free text; empty strings become undefined. Rejects link-stuffed spam. */
export const optionalMessage = (max: number) =>
  z.pipe(
    z.optional(
      z.string().check(
        z.trim(),
        z.maxLength(max, { error: `Message must be ${max} characters or fewer.` }),
        z.refine((text) => (text.match(/https?:\/\/|www\./gi)?.length ?? 0) <= MAX_LINKS, {
          error: "Please remove some links from your message.",
        }),
      ),
    ),
    z.transform((text) => (text ? text : undefined)),
  );

/** Optional short text (e.g. job title); empty strings become undefined. */
export const optionalText = (max: number) =>
  z.pipe(
    z.optional(z.string().check(z.trim(), z.maxLength(max, { error: `Must be ${max} characters or fewer.` }))),
    z.transform((text) => (text ? text : undefined)),
  );

/**
 * Spam traps, checked on the server:
 * - `website` honeypot must stay empty (hidden from people).
 * - `startedAt` is when the form was rendered (ms); humans take > 3 s.
 */
export const spamTrapFields = {
  website: z.optional(z.string().check(z.maxLength(0))),
  startedAt: z.number().check(z.int(), z.positive()),
};
