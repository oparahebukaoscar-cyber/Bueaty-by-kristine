// scripts/check_admin.js
// Usage: node scripts/check_admin.js [USER_UID]
// Reads .env for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Optionally set USER_UID in .env.

import fs from 'fs/promises';

async function readEnv() {
  const p = '.env';
  let txt;
  try {
    txt = await fs.readFile(p, 'utf8');
  } catch (e) {
    throw new Error('.env not found in project root');
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

    const uid = process.argv[2] || env.USER_UID;
    if (!uid) {
      console.error('Provide a USER_UID either as argument or set USER_UID in .env');
      process.exit(2);
    }

    const endpoint = `${url}/rest/v1/admin_users?id=eq.${uid}`;
    const headers = { apikey: key, Authorization: `Bearer ${key}` };

    console.log(`Querying admin_users for id=${uid}...`);
    const res = await fetch(endpoint, { headers });
    const txt = await res.text();
    let data;
    try { data = JSON.parse(txt); } catch (e) { data = txt; }

    console.log('Status:', res.status);
    console.log('Response:', data);

    if (Array.isArray(data)) {
      const isAdmin = data.length > 0;
      console.log(`isAdmin: ${isAdmin}`);
      process.exit(0);
    }

    console.error('Unexpected response shape');
    process.exit(3);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
};

main();
