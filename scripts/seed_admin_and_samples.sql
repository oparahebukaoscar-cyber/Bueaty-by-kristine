-- seed_admin_and_samples.sql
-- Replace '<ADMIN_UID>' with the admin user's auth UID (uuid). Run in Supabase SQL editor.

-- Example: INSERT an admin user row
-- Replace the UUID below with your real user's uid from auth.users
-- INSERT INTO public.admin_users (id, email, created_at)
-- VALUES ('<ADMIN_UID>','admin@example.com', now());

-- Sample product rows (optional)
INSERT INTO public.products (id, name, description, price, category, created_at)
VALUES
  (gen_random_uuid(), '__seed_product_1__', 'Sample seeded product 1', 10.00, 'wig', now()),
  (gen_random_uuid(), '__seed_product_2__', 'Sample seeded product 2', 20.00, 'revamp', now())
ON CONFLICT DO NOTHING;

-- Sample bookings and orders can be inserted similarly for testing (ensure policy allows it)

-- Notes:
-- 1) To add an admin for local dev, paste the admin user's UID from Supabase Auth into the INSERT above and run.
-- 2) If `gen_random_uuid()` is not available, use uuid_generate_v4() or specify literal UUIDs.
