-- apply_admin_policies.sql
-- Run this in Supabase SQL editor (public schema assumed).
-- Creates policies that allow users listed in `public.admin_users` to fully manage products, orders, bookings.

-- Enable RLS on target tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Ensure admin_users table exists and allows the check below (we won't change its data here)
-- Optional: allow authenticated users to SELECT their own row in admin_users
DROP POLICY IF EXISTS admin_users_select_own ON public.admin_users;
CREATE POLICY admin_users_select_own
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Helper expression used in policies: existence of admin row for current user
-- Note: policies below reference admin_users with a simple EXISTS(...) check.

-- DROP any existing admin policies to avoid duplicates
DROP POLICY IF EXISTS admin_manage_products ON public.products;
DROP POLICY IF EXISTS admin_manage_orders ON public.orders;
DROP POLICY IF EXISTS admin_manage_bookings ON public.bookings;

-- Admin full access: SELECT/INSERT/UPDATE/DELETE when user is present in admin_users
CREATE POLICY admin_manage_products
  ON public.products
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()));

CREATE POLICY admin_manage_orders
  ON public.orders
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()));

CREATE POLICY admin_manage_bookings
  ON public.bookings
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.id = auth.uid()));

-- Keep public read access to products for shoppers (if desired). Only add if you want anonymous selects.
-- DROP POLICY IF EXISTS anon_select_products ON public.products;
-- CREATE POLICY anon_select_products
--   ON public.products
--   FOR SELECT
--   TO anon
--   USING (true);

-- Notes:
-- 1) If your policies for `profiles` or functions reference these tables, test carefully to avoid recursion.
-- 2) Run this after seeding an admin user (or run seed first). See `scripts/seed_admin_and_samples.sql`.
