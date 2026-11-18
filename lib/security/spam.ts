/** Pure spam heuristics (no I/O) so they can be unit-tested. */

/** Humans need longer than this to fill in a form. */
export const MIN_FILL_MS = 3000;
/** Forms older than this are treated as stale (replayed or scripted). */
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

export type SpamVerdict = { spam: false } | { spam: true; reason: "honeypot" | "too-fast" | "stale" };

export function checkSpamTraps({ website, startedAt }: { website?: string; startedAt: number }, now = Date.now()): SpamVerdict {
  if (website) return { spam: true, reason: "honeypot" };
  const elapsed = now - startedAt;
  if (elapsed < MIN_FILL_MS) return { spam: true, reason: "too-fast" };
  if (elapsed > MAX_FORM_AGE_MS) return { spam: true, reason: "stale" };
  return { spam: false };
}
