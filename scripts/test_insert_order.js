/* Test inserting an order and order_items to Supabase using VITE env vars
   Run with: node scripts/test_insert_order.js
*/

// Supabase disabled for local development. This script is intentionally inert.
// TODO: Re-enable and implement test insertion when Supabase is reconnected.
// import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Simple .env parser (avoid adding dotenv dependency)
// Try local .env first (project root of frontend), then parent folder
const candidates = ['./.env', '../.env'];
let env = {};
for (const envFile of candidates) {
  try {
    const raw = fs.readFileSync(new URL(envFile, import.meta.url));
    raw.toString().split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([A-Za-z0-9_]+)=([\s\S]*)$/);
      if (m) env[m[1]] = m[2].trim();
    });
    if (Object.keys(env).length) break;
  } catch (e) {
    // try next
  }
}

console.warn('Supabase is disabled — test_insert_order.js will not run.');
process.exit(0);

async function run() {
  try {
    console.log('Attempting to insert test order...');
    const total_amount = 12345;
    const orderPayload = {
      total_amount,
      status: 'pending',
      customer_name: 'Test Customer',
      email: 'test@example.com'
    };

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      console.error('ERROR CODE:', orderError.code);
      console.error('ERROR MESSAGE:', orderError.message);
      console.error('ERROR DETAILS:', orderError.details);
      process.exit(1);
    }

    console.log('Order inserted:', orderData);

    // Try to find an existing product id from the products table to respect DB types (uuid)
    const { data: someProduct, error: prodErr } = await supabase.from('products').select('id').limit(1).single();
    if (prodErr || !someProduct) {
      console.error('Could not find any product id in products table to reference in order_items.');
      console.error('Product lookup error:', prodErr);
      process.exit(1);
    }

    const items = [
      { order_id: orderData.id, product_id: someProduct.id, quantity: 1, price: 12345 }
    ];
    const { data: itemsData, error: itemsError } = await supabase.from('order_items').insert(items).select();
    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      console.error('ERROR CODE:', itemsError.code);
      console.error('ERROR MESSAGE:', itemsError.message);
      console.error('ERROR DETAILS:', itemsError.details);
      process.exit(1);
    }

    console.log('Order items inserted:', itemsData);
    console.log('Test insert complete.');
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

run();
