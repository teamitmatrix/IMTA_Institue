-- ─────────────────────────────────────────────────────────────────────────────
-- Foundation: extensions, shared types and helper functions.
-- ─────────────────────────────────────────────────────────────────────────────

-- Keep updated_at current on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Staff check for future admin dashboards (Supabase SSR auth).
-- app_metadata can only be written with the service role, so users cannot
-- grant themselves this role.
create or replace function public.is_staff()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff'), false);
$$;

create type public.submission_status as enum ('new', 'contacted', 'enrolled', 'closed', 'spam');
create type public.learner_status as enum ('student', 'professional');
create type public.enrollment_status as enum ('upcoming', 'open', 'waitlist', 'closed');
