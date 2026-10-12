-- Anfragen aus dem Beta-Popup der Website (Tester & Interviews)
create table if not exists public.beta_requests (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null check (char_length(email) <= 320),
  message    text check (char_length(message) <= 5000),
  source     text check (char_length(source) <= 500)
);

-- RLS an, keine Policies: anon/authenticated haben keinen Zugriff.
-- Die Website schreibt serverseitig mit dem Service-Role-Key.
alter table public.beta_requests enable row level security;
