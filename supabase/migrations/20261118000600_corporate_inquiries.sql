-- ─────────────────────────────────────────────────────────────────────────────
-- corporate_inquiries: company training requests (BRD §I).
-- Same security model as applications: server-only writes, staff-only reads.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.corporate_inquiries (
  id                     uuid primary key default gen_random_uuid(),
  company_name           text not null check (char_length(company_name) between 2 and 150),
  contact_name           text not null check (char_length(contact_name) between 2 and 100),
  work_email             text not null check (char_length(work_email) <= 254 and work_email = lower(work_email) and work_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  job_title              text check (char_length(job_title) <= 100),
  country_code           char(2) not null check (country_code ~ '^[A-Z]{2}$'),
  company_size           text not null check (company_size in ('1-10', '11-50', '51-200', '201-1000', '1000+')),
  -- From the PDF's three offers: leadership workshops, team upskilling, adoption support.
  training_interests     text[] not null check (
                           cardinality(training_interests) between 1 and 3
                           and training_interests <@ array['leadership_workshops', 'team_upskilling', 'adoption_support']
                         ),
  delivery_preference    text not null check (delivery_preference in ('online', 'on_site', 'either')),
  message                text check (char_length(message) <= 2000),
  status                 public.submission_status not null default 'new',
  submission_count       integer not null default 1 check (submission_count >= 1),
  source_path            text check (char_length(source_path) <= 500),
  user_agent             text check (char_length(user_agent) <= 500),
  ip_hash                text check (char_length(ip_hash) = 64),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index corporate_inquiries_created_at_idx on public.corporate_inquiries (created_at desc);
create index corporate_inquiries_email_idx on public.corporate_inquiries (work_email);

create trigger corporate_inquiries_set_updated_at
  before update on public.corporate_inquiries
  for each row execute function public.set_updated_at();

alter table public.corporate_inquiries enable row level security;

create policy "Staff read corporate inquiries"
  on public.corporate_inquiries for select
  to authenticated
  using (public.is_staff());

create policy "Staff update corporate inquiries"
  on public.corporate_inquiries for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- A repeat inquiry from the same work email within 24 hours refreshes the
-- open inquiry instead of creating a duplicate.
create or replace function public.submit_corporate_inquiry(
  p_company_name        text,
  p_contact_name        text,
  p_work_email          text,
  p_job_title           text,
  p_country_code        text,
  p_company_size        text,
  p_training_interests  text[],
  p_delivery_preference text,
  p_message             text,
  p_source_path         text,
  p_user_agent          text,
  p_ip_hash             text
)
returns table (inquiry_id uuid, is_duplicate boolean)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
begin
  update public.corporate_inquiries c
     set company_name        = p_company_name,
         contact_name        = p_contact_name,
         job_title           = p_job_title,
         country_code        = p_country_code,
         company_size        = p_company_size,
         training_interests  = p_training_interests,
         delivery_preference = p_delivery_preference,
         message             = coalesce(p_message, c.message),
         submission_count    = c.submission_count + 1,
         source_path         = p_source_path,
         user_agent          = p_user_agent,
         ip_hash             = p_ip_hash
   where c.id = (
           select c2.id from public.corporate_inquiries c2
            where c2.work_email = lower(p_work_email)
              and c2.status = 'new'
              and c2.created_at > now() - interval '24 hours'
            order by c2.created_at desc
            limit 1
         )
  returning c.id into v_id;

  if v_id is not null then
    return query select v_id, true;
    return;
  end if;

  insert into public.corporate_inquiries
    (company_name, contact_name, work_email, job_title, country_code, company_size,
     training_interests, delivery_preference, message, source_path, user_agent, ip_hash)
  values
    (p_company_name, p_contact_name, lower(p_work_email), p_job_title, p_country_code, p_company_size,
     p_training_interests, p_delivery_preference, p_message, p_source_path, p_user_agent, p_ip_hash)
  returning id into v_id;

  return query select v_id, false;
end;
$$;

revoke all on function public.submit_corporate_inquiry from public, anon, authenticated;
grant execute on function public.submit_corporate_inquiry to service_role;
