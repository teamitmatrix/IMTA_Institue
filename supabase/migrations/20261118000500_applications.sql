-- ─────────────────────────────────────────────────────────────────────────────
-- applications: course applications from the website form (BRD §K).
--
-- Security model:
--   * RLS on. anon/authenticated have NO insert/select policies, so the
--     browser can never read or write this table directly.
--   * The Next.js server inserts through submit_application(), executable
--     only by service_role, after Zod validation.
--   * Staff (app_metadata.role) may read and update for follow-up.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.applications (
  id                uuid primary key default gen_random_uuid(),
  full_name         text not null check (char_length(full_name) between 2 and 100),
  -- Stored lowercase (normalized by the server) so uniqueness is case-insensitive.
  email             text not null check (char_length(email) <= 254 and email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  role_title        text not null check (char_length(role_title) between 1 and 100),
  course_slug       text not null references public.courses (slug) on update cascade,
  country_code      char(2) not null check (country_code ~ '^[A-Z]{2}$'),
  learner_status    public.learner_status not null,
  message           text check (char_length(message) <= 1000),
  status            public.submission_status not null default 'new',
  submission_count  integer not null default 1 check (submission_count >= 1),
  source_path       text check (char_length(source_path) <= 500),
  user_agent        text check (char_length(user_agent) <= 500),
  -- Salted SHA-256 of the client IP: lets staff spot abuse without storing the raw IP.
  ip_hash           text check (char_length(ip_hash) = 64),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- One open application per email + course. Re-submissions update it.
create unique index applications_open_unique
  on public.applications (email, course_slug)
  where status in ('new', 'contacted');

create index applications_created_at_idx on public.applications (created_at desc);
create index applications_status_idx on public.applications (status);

create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

alter table public.applications enable row level security;

create policy "Staff read applications"
  on public.applications for select
  to authenticated
  using (public.is_staff());

create policy "Staff update applications"
  on public.applications for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Insert-or-refresh in one atomic call. Returns the row id and whether it
-- was a duplicate (an open application for the same email + course).
create or replace function public.submit_application(
  p_full_name      text,
  p_email          text,
  p_role_title     text,
  p_course_slug    text,
  p_country_code   text,
  p_learner_status public.learner_status,
  p_message        text,
  p_source_path    text,
  p_user_agent     text,
  p_ip_hash        text
)
returns table (application_id uuid, is_duplicate boolean)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
begin
  update public.applications a
     set full_name        = p_full_name,
         role_title       = p_role_title,
         country_code     = p_country_code,
         learner_status   = p_learner_status,
         message          = coalesce(p_message, a.message),
         submission_count = a.submission_count + 1,
         source_path      = p_source_path,
         user_agent       = p_user_agent,
         ip_hash          = p_ip_hash
   where a.email = lower(p_email)
     and a.course_slug = p_course_slug
     and a.status in ('new', 'contacted')
  returning a.id into v_id;

  if v_id is not null then
    return query select v_id, true;
    return;
  end if;

  begin
    insert into public.applications
      (full_name, email, role_title, course_slug, country_code, learner_status, message, source_path, user_agent, ip_hash)
    values
      (p_full_name, lower(p_email), p_role_title, p_course_slug, p_country_code, p_learner_status, p_message, p_source_path, p_user_agent, p_ip_hash)
    returning id into v_id;
    return query select v_id, false;
  exception when unique_violation then
    -- A concurrent request inserted the same email + course first.
    select a.id into v_id
      from public.applications a
     where a.email = lower(p_email)
       and a.course_slug = p_course_slug
       and a.status in ('new', 'contacted');
    return query select v_id, true;
  end;
end;
$$;

revoke all on function public.submit_application from public, anon, authenticated;
grant execute on function public.submit_application to service_role;
