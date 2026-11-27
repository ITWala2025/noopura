-- Noopura Indian Classical School of Dance — Supabase PostgreSQL Schema & RLS Policies
-- Designed for seamless integration with Supabase Auth, Postgres, and Storage.

create extension if not exists "pgcrypto";

-- 1. Profiles (extends auth.users with role-based access control)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'instructor', 'admin')),
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- 2. Dance Classes & Curriculum
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  discipline text not null check (discipline in ('bharatanatyam', 'mohiniyattam', 'kuchipudi')),
  level text not null,
  age_group text not null,
  duration_minutes int not null default 60,
  monthly_fee_eur numeric(10, 2) not null,
  term_fee_eur numeric(10, 2) not null,
  instructor text not null,
  location text not null,
  capacity int not null default 14,
  syllabus jsonb not null default '[]'::jsonb,
  description text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.classes enable row level security;

create policy "Public can view active classes"
  on public.classes for select
  using (is_active = true);

create policy "Admins manage classes"
  on public.classes for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- 3. Recurring Schedule & Slot Availability
create table if not exists public.class_slots (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  day_of_week text not null,
  start_time time not null,
  end_time time not null,
  studio text not null,
  instructor text not null,
  capacity int not null default 14,
  booked_count int not null default 0,
  is_holiday boolean not null default false,
  holiday_reason text,
  created_at timestamptz not null default now()
);

alter table public.class_slots enable row level security;

create policy "Public can view available slots"
  on public.class_slots for select
  using (true);

create policy "Admins manage slots"
  on public.class_slots for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- 4. Bookings & Payment Audit Records
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  class_id uuid not null references public.classes(id) on delete restrict,
  slot_id uuid not null references public.class_slots(id) on delete restrict,
  student_name text not null,
  guardian_name text,
  email text not null,
  phone text not null,
  amount_eur numeric(10, 2) not null,
  status text not null default 'pending' check (status in ('confirmed', 'pending', 'cancelled')),
  payment_provider text not null check (payment_provider in ('stripe', 'razorpay')),
  payment_intent_id text,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Students view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Anyone can create a pending booking"
  on public.bookings for insert
  with check (status = 'pending');

create policy "Admins manage all bookings"
  on public.bookings for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
