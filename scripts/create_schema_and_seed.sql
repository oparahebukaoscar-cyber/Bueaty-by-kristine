-- scripts/create_schema_and_seed.sql
-- Run this in the Supabase SQL editor (or psql with sufficient privileges).
-- Creates minimal tables used by the app and inserts sample products.
-- After running this, run apply_admin_policies.sql and apply_orders_rls.sql (both in scripts/).

-- 1) Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2) Products
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  category text,
  created_at timestamptz DEFAULT now()
);

-- 3) Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',
  customer_name text,
  customer_email text,
  created_at timestamptz DEFAULT now()
);

-- 4) Order items
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id),
  product_name text,
  quantity integer NOT NULL DEFAULT 1,
  price numeric(12,2) NOT NULL DEFAULT 0,
  subtotal numeric(12,2) NOT NULL DEFAULT 0
);

-- 5) Profiles (simple shape; Supabase auth users are separate)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  username text,
  email text,
  avatar_url text,
  updated_at timestamptz DEFAULT now()
);

-- 6) Admin users (store auth user IDs here to grant admin rights)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY,
  email text,
  created_at timestamptz DEFAULT now()
);

-- 7) Bookings (minimal)
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  appointment_date timestamptz,
  service text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- 8) Seed sample products
INSERT INTO public.products (id, name, description, price, category, created_at)
VALUES
  (gen_random_uuid(), '__seed_product_1__', 'Sample seeded product 1', 10.00, 'wig', now()),
  (gen_random_uuid(), '__seed_product_2__', 'Sample seeded product 2', 20.00, 'revamp', now())
ON CONFLICT DO NOTHING;

-- 9) Optional: seed an admin user (replace <ADMIN_UID> with a real auth.user id)
-- INSERT INTO public.admin_users (id, email, created_at) VALUES ('<ADMIN_UID>', 'admin@example.com', now()) ON CONFLICT DO NOTHING;

-- Notes:
-- - If your Supabase project does not expose gen_random_uuid(), replace with uuid_generate_v4().
-- - After running this file, run the existing scripts/apply_admin_policies.sql and scripts/apply_orders_rls.sql
--   (they enable RLS and create policies). Apply policies only after the tables exist.
-- - If you want anonymous SELECT on products for the storefront, run the anon_select_products policy in apply_admin_policies.sql (it's commented there).
