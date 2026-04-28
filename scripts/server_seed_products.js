// scripts/server_seed_products.js
// Usage: SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/server_seed_products.js
// This script uses the Supabase service role key (from env) to insert products bypassing RLS.

import fs from 'fs';

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

async function main() {
  const envPath = './.env';
  if (!fs.existsSync(envPath)) {
    console.error('.env not found in project root');
    process.exit(2);
  }

  const env = parseDotEnv(envPath);
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const anonKey = env.VITE_SUPABASE_ANON_KEY || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL missing in .env');
    process.exit(2);
  }
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY missing in environment');
    process.exit(2);
  }

  const restBase = `${supabaseUrl.replace(/\/$/, '')}/rest/v1`;
  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  };

  const products = [
    { name: "Honey Melt Layered Waves", description: "100% Human Hair, HD Lace Front. Soft, sun-kissed waves with a custom finish.", price: 285000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Honey_Blonde_Layered_Lace_Front_Wig_-_Soft_Waves_-_HD_Lace_-_100__Human_Hair_-_Custom_Colored_Unit__3_-removebg-preview_b9k6wm.png", category: 'wigs' },
    { name: "Sun-Kissed Ombré Silk", description: "Luxury custom-colored blonde ombré unit. High-definition lace with pre-plucked hairline.", price: 310000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/download_-_2026-02-10T175139.896-removebg-preview_rtvvzs.png", category: 'wigs' },
    { name: "Executive 6x6 Glueless", description: "180% Density Virgin Human Hair. Sleek bone-straight texture with glueless 6x6 HD lace.", price: 195000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/6x6_Glueless_wig_virgin_human_hair_HD_lace_closure_wigs_180_density_straight_wigs-removebg-preview_a0rsxq.png", category: 'wigs' },
    { name: "The Essential Noir", description: "A timeless, high-quality virgin hair unit. The perfect everyday 'Essential'.", price: 85000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Essential_Female_wig-removebg-preview_djzppc.png", category: 'wigs' },
    { name: "Mocha Glam Curls", description: "Voluminous, bouncy curls designed for a stunning profile. Breathable lace.", price: 145000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Best_Wig_Hairstyles_for_a_Natural___Stunning_Look_-_Fascinate_Names-removebg-preview_1_thrlbh.png", category: 'wigs' },
    { name: "Oceanic Deep Wave", description: "4x4 Deep Wave Natural Unit. Intricate, tight wave patterns with defined shine.", price: 125000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776434/4_4_deep_wave_nat__12_-removebg-preview_u0kx6h.png", category: 'wigs' },
    { name: "The Signature Baddie", description: "Ultra-luxe HD lace front unit. High-density, premium virgin hair for high-fashion styling.", price: 598000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776433/_Free_Use__Baddie_Mannequin_HE-removebg-preview_nglp0c.png", category: 'wigs' },
    { name: "Toffee Melt Body Wave", description: "Multi-tonal warm blonde tones with a classic body wave texture. 13x6 HD lace.", price: 385000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776434/download_-_2026-02-10T175054.907-removebg-preview_1_wvnuxk.png", category: 'wigs' },
    { name: "Rooted Ash Hollywood Glam", description: "Rooted Ash Blonde Hollywood Wave. Luxury 13x6 HD Lace Front with vintage-inspired waves.", price: 450000, image_url: "https://res.cloudinary.com/datw6p2gh/image/upload/v1771776432/Rooted_Ash_Blonde_Hollywood_Wave_Wig_-_13x6_HD_Lace_Front___Luxury_Custom_Unit-removebg-preview_etutyx.png", category: 'wigs' }
  ];

  try {
    const res = await fetch(`${restBase}/products`, { method: 'POST', headers, body: JSON.stringify(products) });
    const txt = await res.text();
    let json;
    try { json = JSON.parse(txt); } catch { json = txt; }
    console.log('Insert status', res.status);
    console.log('Response:', json);
    if (!res.ok) process.exitCode = 1;
  } catch (err) {
    console.error('Seeding failed:', err && err.message ? err.message : err);
    process.exit(1);
  }

  console.log('Server-side seeding complete');
}

main();
