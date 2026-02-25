/*
  Test: public/guest can create an order via the Edge Function.

  This intentionally does NOT use a service-role key and does NOT sign in.

  Run:
    node scripts/test_public_create_order.js

  Expected:
    - HTTP 200
    - JSON: { success: true, order_id: "..." }
*/

import fs from 'fs';
import path from 'path';

function parseDotEnv(filePath) {
  const env = {};
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z0-9_]+)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function mask(value) {
  if (!value) return '(missing)';
  if (value.length <= 16) return '***';
  return `${value.slice(0, 10)}…${value.slice(-6)}`;
}

async function main() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error(`Missing .env at: ${envPath}`);
    process.exit(2);
  }

  const env = parseDotEnv(envPath);
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(2);
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/create-order`;

  const restBase = `${supabaseUrl.replace(/\/$/, '')}/rest/v1`;

  async function getFirstProductId() {
    const res = await fetch(`${restBase}/products?select=id&limit=1`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    if (!res.ok) return null;
    const id = Array.isArray(json) && json[0] && json[0].id ? String(json[0].id) : '';
    return id || null;
  }

  async function postCreateOrder(payload) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    return { res, text, json };
  }

  function logAttempt(label, attempt) {
    console.log(`\n== ${label} ==`);
    console.log('HTTP', attempt.res.status, attempt.res.statusText);
    if (attempt.json) console.log('Response JSON:', attempt.json);
    else console.log('Response (non-JSON):', attempt.text.slice(0, 2000));
  }

  // Try the newer payload format first (supported by the repo version of the function).
  const payloadV2 = {
    customer: {
      full_name: 'Public Test Customer',
      email: 'public-test@example.com',
    },
    customer_name: 'Public Test Customer',
    customer_email: 'public-test@example.com',
    items: [{ name: 'Test Item', price: 1000, quantity: 2 }],
    notes: 'public create-order test',
  };

  console.log('POST', endpoint);
  console.log('Using apikey:', mask(supabaseAnonKey));
  console.log('Using bearer:', mask(supabaseAnonKey));

  const attempts = [];

  // Attempt 1: newest payload
  let attempt = await postCreateOrder(payloadV2);
  attempts.push({ label: 'Attempt 1 (name/price/quantity)', attempt });
  if (attempt.res.ok) {
    logAttempt(attempts.at(-1).label, attempt);
  }

  // Attempt 2: legacy payload that doesn't require product_id
  // Format: { product_name, quantity, subtotal }
  if (!attempt.res.ok && attempt.res.status === 400) {
    const payloadLegacy = {
      items: [{ product_name: 'Test Item', quantity: 2, subtotal: 2000 }],
      notes: 'public create-order test (fallback product_name/subtotal payload)',
    };
    attempt = await postCreateOrder(payloadLegacy);
    attempts.push({ label: 'Attempt 2 (product_name/subtotal)', attempt });
  }

  // Log attempts so far even if later steps fail
  for (const a of attempts) logAttempt(a.label, a.attempt);

  // Attempt 3: older deployments often require { product_id, quantity }
  if (!attempt.res.ok && attempt.res.status === 400) {
    const product_id = await getFirstProductId();
    if (!product_id) {
      process.exitCode = 1;
      throw new Error(
        'Deployed create-order appears to require product_id, but no products were returned from the public products endpoint. Seed at least one product (admin action) and re-run the test.',
      );
    }

    const payloadV1 = {
      items: [{ product_id, quantity: 1 }],
      notes: 'public create-order test (fallback product_id payload)',
    };
    attempt = await postCreateOrder(payloadV1);
    logAttempt(`Attempt 3 (product_id=${product_id})`, attempt);
  }

  if (!attempt.res.ok) {
    process.exitCode = 1;
    console.error(`FAIL: create-order failed (HTTP ${attempt.res.status}).`);
    return;
  }

  if (!attempt.json?.success || !attempt.json?.order_id) {
    process.exitCode = 1;
    console.error('FAIL: Unexpected success response shape.');
    return;
  }

  console.log('\nPASS: public order created. order_id =', attempt.json.order_id);
}

main().catch((err) => {
  console.error('Test failed with exception:', err);
  process.exitCode = 1;
});
