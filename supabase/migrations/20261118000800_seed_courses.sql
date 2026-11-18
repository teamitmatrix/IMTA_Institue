-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: the 10 official courses. GENERATED from data/courses.ts by
-- scripts/generate-course-seed.ts — do not edit by hand.
-- NULL = not stated in the source PDF (never invented).
-- Idempotent: re-running updates existing rows.
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.courses
  (slug, name, category, is_flagship, description, duration, live_sessions,
   session_length, schedule, level, experience, designed_for, sort_order)
values
  ('ai-for-professionals', 'AI for Professionals', 'Professionals', true, 'Use AI for your real daily work: writing, spreadsheets, research and automation. Finish with a capstone built on your own job.', '4 weeks', 12, '2 hours each', '3 sessions a week', 'Beginner to intermediate', null, null, 1),
  ('ai-for-job-seekers', 'AI for Job Seekers: Interview Prep', 'Job Seekers', false, 'Prepare for interviews with AI. Rewrite your resume and LinkedIn, practice mock interviews with AI, and answer the AI-skill questions employers now ask.', '2 weeks', 6, null, null, 'All levels', null, null, 2),
  ('ai-for-students', 'AI for Students', 'Students', false, 'Study smarter with AI: research, note-taking, exam prep and projects, used honestly and within your university''s rules. Plus the AI skills that get you hired.', '3 weeks', 6, null, null, 'Beginner', null, null, 3),
  ('ai-in-daily-life', 'AI in Daily Life', 'Everyone', false, 'A friendly start for anyone. Use AI for planning, learning, writing, shopping and travel, and know when not to trust it.', '1 weekend workshop', null, null, null, null, 'No experience needed', null, 4),
  ('prompt-engineering', 'Prompt Engineering', 'Core Skill', false, 'Master the skill behind every AI tool. Write prompts that give reliable, structured results in ChatGPT, Claude, Gemini and Copilot, and build your own prompt library.', '2 weeks', 6, null, null, 'All levels', null, null, 5),
  ('ai-security-and-safety', 'AI Security & Safety', 'Security', false, 'Spot deepfakes, AI voice scams and AI phishing. Protect your data when using AI at work, and understand the risks companies face as they adopt AI.', '2 weeks', 6, null, null, 'All levels', null, null, 6),
  ('ai-automation-and-agents', 'AI Automation & Agents', 'Advanced', false, 'Build custom AI assistants and no-code automations with tools like Zapier, Make and n8n that handle repetitive work for you.', '3 weeks', 9, null, null, 'Intermediate', null, null, 7),
  ('ai-for-data-analysis', 'AI for Data Analysis', 'Data', false, 'Analyze data, build reports and create charts with AI in Excel and Google Sheets, without writing code.', '3 weeks', 9, null, null, 'Beginner to intermediate', null, null, 8),
  ('ai-for-marketing-and-content', 'AI for Marketing & Content', 'Marketing', false, 'Plan campaigns and create posts, videos, images and ad copy with AI, while keeping your brand''s voice.', '2 weeks', 6, null, null, 'All levels', null, null, 9),
  ('ai-for-business-leaders', 'AI for Business Leaders', 'Leaders', false, 'AI strategy for decision-makers: where AI creates value, how to measure ROI, and how to roll it out safely across your company.', '1-day workshop', null, null, null, null, null, 'Managers and executives', 10)
on conflict (slug) do update set
  name           = excluded.name,
  category       = excluded.category,
  is_flagship    = excluded.is_flagship,
  description    = excluded.description,
  duration       = excluded.duration,
  live_sessions  = excluded.live_sessions,
  session_length = excluded.session_length,
  schedule       = excluded.schedule,
  level          = excluded.level,
  experience     = excluded.experience,
  designed_for   = excluded.designed_for,
  sort_order     = excluded.sort_order;
