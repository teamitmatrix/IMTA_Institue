-- ─────────────────────────────────────────────────────────────────────────────
-- site_settings: key/value configuration. Only rows marked is_public are
-- readable without staff access; private settings never reach the browser.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.site_settings (
  key          text primary key check (key ~ '^[a-z0-9_]+$'),
  value        jsonb not null default 'null'::jsonb,
  is_public    boolean not null default false,
  description  text,
  updated_at   timestamptz not null default now()
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "Public settings are readable"
  on public.site_settings for select
  to anon, authenticated
  using (is_public or public.is_staff());

create policy "Staff manage settings"
  on public.site_settings for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Only facts stated in the source PDF are seeded.
insert into public.site_settings (key, value, is_public, description) values
  ('contact_email', '"institute@imta.io"', true, 'Public contact email (from the source PDF).'),
  ('applications_open', 'true', true, 'Set to false to pause the application form.'),
  ('corporate_inquiries_open', 'true', true, 'Set to false to pause the team-training form.'),
  ('notification_email', 'null', false, 'Private: where new submissions should be sent. TBC by IMTA.');
