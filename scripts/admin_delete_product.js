// scripts/admin_delete_product.js
// Usage: node scripts/admin_delete_product.js <PRODUCT_ID>
// Reads .env for VITE_SUPABASE_URL and USER_ACCESS_TOKEN (a user's access token) 
// The token must belong to an admin user (present in public.admin_users)

import fs from 'fs/promises';

async function readEnv() {
  const p = '.env';
  const txt = await fs.readFile(p, 'utf8');
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
    const token = env.USER_ACCESS_TOKEN;
    if (!url) throw new Error('VITE_SUPABASE_URL missing in .env');
    if (!token) throw new Error('USER_ACCESS_TOKEN missing in .env (admin access token required)');

    const productId = process.argv[2];
    if (!productId) {
      console.error('Usage: node scripts/admin_delete_product.js <PRODUCT_ID>');
      process.exit(2);
    }

    const endpoint = `${url}/rest/v1/products?id=eq.${productId}`;
    console.log('Deleting product id=', productId);

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        apikey: env.VITE_SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${token}`,
        Prefer: 'return=representation'
      }
    });

    const txt = await res.text();
    let data;
    try { data = JSON.parse(txt); } catch (e) { data = txt; }

    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
};

main();
