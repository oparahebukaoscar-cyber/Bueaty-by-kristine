// test-supabase.js (ESM)
// Reads .env for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// Calls /profiles, /orders, /products and prints status + body

import fs from 'fs/promises';

async function readEnv() {
  const p = '.env';
  let txt;
  try {
    txt = await fs.readFile(p, 'utf8');
  } catch (e) {
    throw new Error('.env not found');
  }
  const lines = txt.split(/\r?\n/);
  const map = {};
  for (const l of lines) {
    const m = l.match(/^\s*([A-Z0-9_]+)=(.*)$/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

const main = async () => {
  try {
    const env = await readEnv();
    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');

    const id = '54c14a8f-b0ca-48d6-8576-c4efc4efc2ea'; // from your logs
    const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };

    const endpoints = [
      { name: 'PROFILES', url: `${url}/rest/v1/profiles?select=*&id=eq.${id}` },
      { name: 'ORDERS', url: `${url}/rest/v1/orders?select=id,total_amount,status,created_at,order_items(product_name,quantity,subtotal)` },
      { name: 'PRODUCTS', url: `${url}/rest/v1/products?columns="name","description","price","category"` },
    ];

    for (const ep of endpoints) {
      console.log('\n---- ' + ep.name + ' ----');
      try {
        const res = await fetch(ep.url, { headers });
        console.log('Status:', res.status);
        const ct = res.headers.get('content-type') || '';
        const txt = await res.text();
        if (ct.includes('application/json') || txt.trim().startsWith('{') || txt.trim().startsWith('[')) {
          try {
            console.log('Body (JSON):', JSON.parse(txt));
          } catch (e) {
            console.log('Body (raw):', txt);
          }
        } else {
          console.log('Body (raw):', txt);
        }
      } catch (err) {
        console.error('Request error:', err && err.message ? err.message : err);
      }
    }

    // --- POST tests ---
    console.log('\n---- POST (anonymous) ----');
    try {
      const postBodyAnon = { total_amount: 25.0, status: 'pending', user_id: null };
      const resPostAnon = await fetch(`${url}/rest/v1/orders`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: JSON.stringify(postBodyAnon),
      });
      console.log('Status:', resPostAnon.status);
      const txtPostAnon = await resPostAnon.text();
      try { console.log('Body:', JSON.parse(txtPostAnon)); } catch (e) { console.log('Body (raw):', txtPostAnon); }
    } catch (err) {
      console.error('POST anon error:', err && err.message ? err.message : err);
    }

    // Authenticated POST (requires a user access token in .env as USER_ACCESS_TOKEN and USER_UID)
    if (env.USER_ACCESS_TOKEN && env.USER_UID) {
      console.log('\n---- POST (authenticated) ----');
      try {
        const userToken = env.USER_ACCESS_TOKEN;
        const authHeaders = { 'apikey': key, 'Authorization': `Bearer ${userToken}` };
        const postBodyAuth = { total_amount: 50.0, status: 'pending', user_id: env.USER_UID };
        const resPostAuth = await fetch(`${url}/rest/v1/orders`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json', Prefer: 'return=representation' },
          body: JSON.stringify(postBodyAuth),
        });
        console.log('Status:', resPostAuth.status);
        const txtPostAuth = await resPostAuth.text();
        try { console.log('Body:', JSON.parse(txtPostAuth)); } catch (e) { console.log('Body (raw):', txtPostAuth); }
      } catch (err) {
        console.error('POST auth error:', err && err.message ? err.message : err);
      }
    } else {
      console.log('\nSkipping authenticated POST: set USER_ACCESS_TOKEN and USER_UID in .env to test this.');
    }
  } catch (err) {
    console.error('Fatal:', err.message || err);
    process.exit(1);
  }
};

main();
