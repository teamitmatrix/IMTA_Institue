-- ─────────────────────────────────────────────────────────────────────────────
-- courses: the official catalog (BRD §F). Mirrors data/courses.ts, which
-- remains the source the static site renders from. Nullable columns stay
-- NULL where the source PDF does not state a value.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.courses (
  slug            text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name            text not null,
  category        text not null,
  is_flagship     boolean not null default false,
  description     text not null,
  duration        text not null,
  live_sessions   smallint check (live_sessions > 0),
  session_length  text,
  schedule        text,
  level           text,
  experience      text,
  designed_for    text,
  sort_order      smallint not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create unique index courses_single_flagship on public.courses (is_flagship) where is_flagship;

create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

alter table public.courses enable row level security;

-- Anyone may read published courses (public catalog).
create policy "Published courses are public"
  on public.courses for select
  to anon, authenticated
  using (is_published or public.is_staff());

-- Only staff may change the catalog.
create policy "Staff manage courses"
  on public.courses for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());
