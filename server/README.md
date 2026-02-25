Order server (secure)
======================

This small Express server provides a secure endpoint to create orders using the Supabase `service_role` key so client-side RLS doesn't block inserts.

Setup
-----

1. Create a `.env` (or set env vars) with:

   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=service_role_key_here

2. Install and run:

   cd server
   npm install
   npm start

Usage
-----

POST /orders

Body JSON:

{
  "customer": { "name":"...", "email":"...", "phone":"...", "address":"..." },
  "total_amount": 12345,
  "items": [ { "product_id": "<uuid>", "quantity": 1, "price": 12345 } ]
}

The server will insert the `orders` row and the related `order_items`, returning the created rows.

Security
--------
Keep the `SUPABASE_SERVICE_ROLE_KEY` secret and do not expose this server publicly without authentication.
