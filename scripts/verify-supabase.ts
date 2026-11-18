/**
 * Verifies the live Supabase project end to end: schema, seed data, RLS and
 * the submission functions. Creates test rows and deletes them afterwards.
 *
 *   npm run verify:supabase        (reads .env.local)
 *
 * Exit code 0 = every check passed.
 */
import { createClient } from "@supabase/supabase-js";
import { courses } from "@/data/courses";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !publishableKey || !secretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or SUPABASE_SECRET_KEY in .env.local");
  process.exit(1);
}

const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const anon = createClient<Database>(url, publishableKey, opts);
const admin = createClient<Database>(url, secretKey, opts);

const runId = Date.now().toString(36);
const testEmail = `verify+${runId}@example.com`;
const results: { name: string; ok: boolean; detail?: string }[] = [];

async function check(name: string, fn: () => Promise<string | void>) {
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail: detail || undefined });
  } catch (error) {
    results.push({ name, ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const applicationArgs = (overrides: Partial<Database["public"]["Functions"]["submit_application"]["Args"]> = {}) => ({
  p_full_name: "Verify Script",
  p_email: testEmail,
  p_role_title: "QA",
  p_course_slug: "prompt-engineering",
  p_country_code: "US",
  p_learner_status: "professional" as const,
  p_message: null,
  p_source_path: "/verify",
  p_user_agent: "verify-supabase",
  p_ip_hash: "0".repeat(64),
  ...overrides,
});

// ── Public (anon) access: what a browser or attacker can do ────────────────
await check("anon can read the 10 published courses, matching data/courses.ts", async () => {
  const { data, error } = await anon.from("courses").select("*").order("sort_order");
  assert(!error, `select failed: ${error?.message}`);
  assert(data.length === courses.length, `expected ${courses.length} courses, got ${data.length}`);
  for (const c of courses) {
    const row = data.find((r) => r.slug === c.slug);
    assert(row, `missing course ${c.slug}`);
    assert(row.name === c.name && row.description === c.description, `content mismatch for ${c.slug}`);
    assert(row.live_sessions === c.format.liveSessions && row.level === c.format.level, `format mismatch for ${c.slug}`);
  }
  return `${data.length} courses`;
});

await check("anon sees only public site settings", async () => {
  const { data, error } = await anon.from("site_settings").select("key");
  assert(!error, `select failed: ${error?.message}`);
  const keys = data.map((r) => r.key);
  assert(keys.includes("contact_email"), "contact_email should be public");
  assert(!keys.includes("notification_email"), "notification_email must NOT be visible to anon");
  return keys.join(", ");
});

await check("anon can query cohorts (published only)", async () => {
  const { error } = await anon.from("cohort_information").select("id, is_published");
  assert(!error, `select failed: ${error?.message}`);
});

for (const table of ["applications", "corporate_inquiries", "rate_limit_events"] as const) {
  await check(`anon cannot read ${table}`, async () => {
    const { data, error } = await anon.from(table).select("*").limit(1);
    assert(error || data.length === 0, `anon read ${data?.length} row(s) from ${table}`);
  });
}

await check("anon cannot insert applications directly", async () => {
  const { error } = await anon.from("applications").insert({
    full_name: "Anon Attempt",
    email: testEmail,
    role_title: "x",
    course_slug: "prompt-engineering",
    country_code: "US",
    learner_status: "student",
  });
  assert(error, "anon insert unexpectedly succeeded");
  return `blocked (${error.code})`;
});

await check("anon cannot insert corporate inquiries directly", async () => {
  const { error } = await anon.from("corporate_inquiries").insert({
    company_name: "Anon Co",
    contact_name: "Anon",
    work_email: testEmail,
    country_code: "US",
    company_size: "1-10",
    training_interests: ["team_upskilling"],
    delivery_preference: "online",
  });
  assert(error, "anon insert unexpectedly succeeded");
  return `blocked (${error.code})`;
});

for (const fn of ["submit_application", "check_rate_limit"] as const) {
  await check(`anon cannot execute ${fn}()`, async () => {
    const { error } =
      fn === "submit_application"
        ? await anon.rpc("submit_application", applicationArgs())
        : await anon.rpc("check_rate_limit", { p_key: `verify:${runId}`, p_limit: 1, p_window_seconds: 60 });
    assert(error, `anon executed ${fn}()`);
    return `blocked (${error.code})`;
  });
}

// ── Server (secret key) flows: what the Next.js server actions do ──────────
await check("server: new application is inserted", async () => {
  const { data, error } = await admin.rpc("submit_application", applicationArgs());
  assert(!error, error?.message ?? "");
  assert(data?.[0] && data[0].is_duplicate === false, `expected new row, got ${JSON.stringify(data)}`);
  return data[0].application_id;
});

await check("server: duplicate (same email, different case) refreshes instead of inserting", async () => {
  const { data, error } = await admin.rpc("submit_application", applicationArgs({ p_email: testEmail.toUpperCase(), p_message: "second try" }));
  assert(!error, error?.message ?? "");
  assert(data?.[0]?.is_duplicate === true, `expected duplicate, got ${JSON.stringify(data)}`);
  const { data: rows } = await admin.from("applications").select("submission_count, message").eq("email", testEmail);
  assert(rows?.length === 1, `expected 1 row, found ${rows?.length}`);
  assert(rows[0].submission_count === 2 && rows[0].message === "second try", `unexpected row ${JSON.stringify(rows[0])}`);
  return "1 row, submission_count = 2";
});

await check("server: unknown course is rejected by the foreign key", async () => {
  const { error } = await admin.rpc("submit_application", applicationArgs({ p_course_slug: "not-a-course", p_email: `fk+${testEmail}` }));
  assert(error?.code === "23503", `expected 23503, got ${error?.code} ${error?.message}`);
  return "23503";
});

await check("server: malformed email is rejected by the database constraint", async () => {
  const { error } = await admin.rpc("submit_application", applicationArgs({ p_email: "not-an-email" }));
  assert(error?.code === "23514", `expected 23514, got ${error?.code} ${error?.message}`);
  return "23514";
});

await check("server: corporate inquiry inserts, then de-duplicates within 24h", async () => {
  const args = {
    p_company_name: "Verify Co",
    p_contact_name: "Verify Script",
    p_work_email: testEmail,
    p_job_title: null,
    p_country_code: "US",
    p_company_size: "11-50",
    p_training_interests: ["team_upskilling", "adoption_support"],
    p_delivery_preference: "either",
    p_message: null,
    p_source_path: "/verify",
    p_user_agent: "verify-supabase",
    p_ip_hash: "0".repeat(64),
  };
  const first = await admin.rpc("submit_corporate_inquiry", args);
  assert(!first.error && first.data?.[0]?.is_duplicate === false, `first: ${first.error?.message ?? JSON.stringify(first.data)}`);
  const second = await admin.rpc("submit_corporate_inquiry", { ...args, p_message: "follow-up" });
  assert(!second.error && second.data?.[0]?.is_duplicate === true, `second: ${second.error?.message ?? JSON.stringify(second.data)}`);
  return "new, then duplicate";
});

await check("server: shared rate limit allows 2 then blocks the 3rd", async () => {
  const key = `verify:${runId}`;
  const outcomes: boolean[] = [];
  for (let i = 0; i < 3; i++) {
    const { data, error } = await admin.rpc("check_rate_limit", { p_key: key, p_limit: 2, p_window_seconds: 60 });
    assert(!error, error?.message ?? "");
    outcomes.push(data as boolean);
  }
  assert(JSON.stringify(outcomes) === "[true,true,false]", `got ${JSON.stringify(outcomes)}`);
  return outcomes.join(", ");
});

// ── Cleanup ────────────────────────────────────────────────────────────────
await check("cleanup test rows", async () => {
  const a = await admin.from("applications").delete().like("email", `%${runId}@example.com`);
  const c = await admin.from("corporate_inquiries").delete().eq("work_email", testEmail);
  const r = await admin.from("rate_limit_events").delete().eq("bucket_key", `verify:${runId}`);
  assert(!a.error && !c.error && !r.error, a.error?.message || c.error?.message || r.error?.message || "");
});

// ── Report ─────────────────────────────────────────────────────────────────
const width = Math.max(...results.map((r) => r.name.length));
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}  ${r.detail ?? ""}`);
}
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
