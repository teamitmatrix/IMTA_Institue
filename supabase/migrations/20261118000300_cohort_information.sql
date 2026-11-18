-- ─────────────────────────────────────────────────────────────────────────────
-- cohort_information: dates, times and fees per course cohort.
-- Deliberately NOT seeded — dates, session times and prices must come from
-- IMTA (BRD §L). The site shows "Announced soon" until a row is published.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.cohort_information (
  id                 uuid primary key default gen_random_uuid(),
  course_slug        text not null references public.courses (slug) on update cascade on delete cascade,
  label              text check (char_length(label) <= 120),
  start_date         date,
  end_date           date,
  session_times      text check (char_length(session_times) <= 200),
  time_zone          text check (char_length(time_zone) <= 64),
  fee_amount         numeric(10, 2) check (fee_amount >= 0),
  fee_currency       char(3) not null default 'USD' check (fee_currency ~ '^[A-Z]{3}$'),
  seats              smallint check (seats > 0),
  enrollment_status  public.enrollment_status not null default 'upcoming',
  is_published       boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint cohort_dates_ordered check (end_date is null or start_date is null or end_date >= start_date)
);

create index cohort_information_course_idx on public.cohort_information (course_slug, start_date);

create trigger cohort_information_set_updated_at
  before update on public.cohort_information
  for each row execute function public.set_updated_at();

alter table public.cohort_information enable row level security;

create policy "Published cohorts are public"
  on public.cohort_information for select
  to anon, authenticated
  using (is_published or public.is_staff());

create policy "Staff manage cohorts"
  on public.cohort_information for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());
