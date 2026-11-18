# IMTA AI Institute — website

Marketing and application site for IMTA AI Institute (institute.imta.io).
Built from the approved Business Requirements Document; all business copy is
verbatim from the source PDF.

**Stack:** Next.js 16 (App Router, Cache Components, Partial Prefetching) · React 19 ·
TypeScript · Tailwind CSS 4 (CSS-only motion) · Lucide · Supabase · Zod 4 (zod/mini on forms) · React Hook Form.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values; the site runs without Supabase keys
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (also validates static rendering rules) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check (run `npx next typegen` first on a fresh clone) |

## Architecture

```
app/                    Routes only — thin pages that compose components with data
  layout.tsx            Fonts, global metadata, header/footer, Organization JSON-LD,
                        ensureStatic = "navigation" (whole site must prerender)
  page.tsx              Homepage (sections in PDF order)
  courses/[slug]/       10 statically generated course pages
  flagship/ for-teams/ faq/ apply/ about/
  error.tsx             Route error boundary · global-error.tsx root fallback
  not-found.tsx         Custom 404 · sitemap.ts · robots.ts · icon.svg
components/
  ui/                   Design-system primitives (Button, Card, Badge, Section…)
  layout/               Header, mobile nav, footer, logo, page header
  sections/             Homepage/page sections (Hero, StatsStrip, …)
  courses/              Course card + grid
  forms/                Application + team enquiry forms (next phase)
  interactive/          Reveal (CSS scroll-driven animation, zero JS)
data/                   ALL site copy, typed — edit content here, never in components
lib/
  env/                  Zod-validated env: public.ts (browser-safe), server.ts (server-only)
  supabase/             client.ts (browser) · server.ts (cookie session) · admin.ts (secret key, server-only)
  validations/          Zod schemas shared by client forms and Server Actions
  seo/                  Page metadata helper + JSON-LD builders
  utils/                cn(), ActionResult type
types/                  Content model + Supabase database types
supabase/migrations/    SQL schema (applications table, RLS enabled)
```

### Rules

- **Server Components by default.** `"use client"` only for interactivity (mobile nav, Motion, forms, error boundaries).
- **Static by default.** The root layout enforces `ensureStatic = "navigation"`; build/dev fail if a page reads cookies/headers or uncached data. Supabase runs only in Server Actions / Route Handlers.
- **Secrets stay server-side.** `SUPABASE_SECRET_KEY` is only read in `lib/env/server.ts`, guarded by `server-only`. Never prefix secrets with `NEXT_PUBLIC_`.
- **Content is data.** Placeholders from the PDF (`[START DATE]`, `[YOUR PRICE]`, `[SESSION TIMES]`) are set in `data/site.ts` → `cohort`; empty values render fallbacks, never bracket text.
- **Errors:** expected errors (validation, unavailable services) are returned as `ActionResult` values; unexpected ones throw to `error.tsx`.

### Supabase backend

**Tables** (`supabase/migrations/`, apply in order):

| Table | Purpose | Public (anon) access |
| --- | --- | --- |
| `courses` | Official catalog, seeded from `data/courses.ts` | Read published rows |
| `cohort_information` | Dates, session times, fees per cohort — **not seeded** | Read published rows |
| `site_settings` | Key/value config (`applications_open`, …) | Read rows marked public |
| `applications` | Course applications | **None** |
| `corporate_inquiries` | Team-training requests | **None** |
| `rate_limit_events` | Shared rate-limit counters (hashed keys) | **None** |

**Write path:** browser → Server Action (Zod re-validation, honeypot, timing trap,
rate limit per IP + email) → `submit_application()` / `submit_corporate_inquiry()`
executed with the secret key. These functions are executable **only** by `service_role`.
A repeat application for the same email + course refreshes the open application
instead of creating a duplicate; the form shows the same success message either way
(no email enumeration). Staff access for a future admin UI uses
`app_metadata.role = 'admin' | 'staff'` (settable only with the service role).

**Setup**

1. Create a Supabase project. Copy the URL, publishable key and secret key into `.env.local`
   (see `.env.example`) and set `RATE_LIMIT_SALT` to a random 32+ character string.
2. Apply the migrations in order — SQL editor, or `npx supabase link` then `npx supabase db push`.
3. Run `npm run verify:supabase` — checks schema, seed data, RLS (as the public key) and
   both submission flows, then deletes its test rows. All checks must pass.
4. Publish a cohort when dates are confirmed: insert into `cohort_information` with
   `is_published = true`. The site picks it up within an hour.

| Script | Purpose |
| --- | --- |
| `npm test` | Unit tests (validation, spam traps, catalog/seed drift) |
| `npm run db:seed:generate` | Regenerate the courses seed after editing `data/courses.ts` |
| `npm run verify:supabase` | Live end-to-end check against your Supabase project |
