-- ─────────────────────────────────────────────────────────────────────────────
-- Shared rate limiting for form submissions (works across serverless
-- instances, unlike in-memory counters). Keys contain only salted hashes.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.rate_limit_events (
  id          bigint generated always as identity primary key,
  bucket_key  text not null check (char_length(bucket_key) <= 128),
  created_at  timestamptz not null default now()
);

create index rate_limit_events_lookup on public.rate_limit_events (bucket_key, created_at desc);

-- RLS on with no policies: invisible to anon/authenticated.
alter table public.rate_limit_events enable row level security;

-- Records an attempt and returns true if it is within the limit.
create or replace function public.check_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_count integer;
begin
  -- Serialize attempts for the same key so concurrent requests can't race past the limit.
  perform pg_advisory_xact_lock(hashtext(p_key));

  select count(*) into v_count
    from public.rate_limit_events
   where bucket_key = p_key
     and created_at > now() - make_interval(secs => p_window_seconds);

  if v_count >= p_limit then
    return false;
  end if;

  insert into public.rate_limit_events (bucket_key) values (p_key);

  -- Opportunistic cleanup of old events (cheap; indexed).
  delete from public.rate_limit_events where created_at < now() - interval '1 day';

  return true;
end;
$$;

revoke all on function public.check_rate_limit from public, anon, authenticated;
grant execute on function public.check_rate_limit to service_role;
