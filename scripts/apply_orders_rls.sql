-- apply_orders_rls.sql
-- Run this in Supabase SQL editor (replace schema/table if different)

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS anon_insert_orders ON public.orders;
DROP POLICY IF EXISTS auth_insert_orders ON public.orders;

CREATE POLICY anon_insert_orders
  ON public.orders
  FOR INSERT
  TO anon
  USING (true)
  WITH CHECK (
    (total_amount IS NOT NULL)
    AND (total_amount > 0)
    AND ((status IS NULL) OR (status = 'pending'))
    AND (user_id IS NULL)
  );

CREATE POLICY auth_insert_orders
  ON public.orders
  FOR INSERT
  TO authenticated
  USING (true)
  WITH CHECK (
    (total_amount IS NOT NULL)
    AND (total_amount > 0)
    AND ((status IS NULL) OR (status = 'pending'))
    AND (user_id = auth.uid())
  );

-- Notes:
-- 1) If you have other triggers or policies that reference `profiles` or call functions that select from `profiles`, they can cause errors (42P17 infinite recursion) or block inserts.
-- 2) After running this, test the anonymous POST (user_id null) and an authenticated POST using a real user access token.
-- 3) If your Edge Function `create-order` needs to set `user_id` for a guest, it must run with the service_role key or insert via a privileged API.
