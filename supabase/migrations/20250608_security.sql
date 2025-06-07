-- Login attempts tracking
create table login_attempts (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  count int default 0,
  locked_until timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Security audit log
create table security_audit_log (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  action text not null,
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table login_attempts enable row level security;
alter table security_audit_log enable row level security;

-- Policies
create policy "No one can update login_attempts except the service role"
  on login_attempts for all using (false);

create policy "Only admins can read security audit log"
  on security_audit_log for select
  using (auth.jwt() ->> 'role' = 'admin');