import { test } from "node:test";
import assert from "node:assert/strict";
import { checkSpamTraps, MAX_FORM_AGE_MS, MIN_FILL_MS } from "@/lib/security/spam";

const now = 1_800_000_000_000;

test("honeypot filled is spam", () => {
  assert.deepEqual(checkSpamTraps({ website: "x", startedAt: now - 60_000 }, now), { spam: true, reason: "honeypot" });
});

test("submitting faster than a human is flagged", () => {
  assert.deepEqual(checkSpamTraps({ startedAt: now - (MIN_FILL_MS - 1) }, now), { spam: true, reason: "too-fast" });
});

test("stale forms are flagged", () => {
  assert.deepEqual(checkSpamTraps({ startedAt: now - MAX_FORM_AGE_MS - 1 }, now), { spam: true, reason: "stale" });
});

test("a normal submission passes", () => {
  assert.deepEqual(checkSpamTraps({ website: "", startedAt: now - 45_000 }, now), { spam: false });
});
