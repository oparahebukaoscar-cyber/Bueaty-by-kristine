-- scripts/seed_products.sql
-- Run in Supabase SQL editor or psql
INSERT INTO public.products (name, description, price, image_url, category)
VALUES
('Honey Melt Layered Waves', '100% Human Hair, HD Lace Front. Soft, sun-kissed waves with a custom finish.', 285000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Honey_Blonde_Layered_Lace_Front_Wig_-_Soft_Waves_-_HD_Lace_-_100__Human_Hair_-_Custom_Colored_Unit__3_-removebg-preview_b9k6wm.png', 'wigs'),
('Sun-Kissed Ombré Silk', 'Luxury custom-colored blonde ombré unit. High-definition lace with pre-plucked hairline.', 310000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/download_-_2026-02-10T175139.896-removebg-preview_rtvvzs.png', 'wigs'),
('Executive 6x6 Glueless', '180% Density Virgin Human Hair. Sleek bone-straight texture with glueless 6x6 HD lace.', 195000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/6x6_Glueless_wig_virgin_human_hair_HD_lace_closure_wigs_180_density_straight_wigs-removebg-preview_a0rsxq.png', 'wigs'),
('The Essential Noir', 'A timeless, high-quality virgin hair unit. The perfect everyday ''Essential''.', 85000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Essential_Female_wig-removebg-preview_djzppc.png', 'wigs'),
('Mocha Glam Curls', 'Voluminous, bouncy curls designed for a stunning profile. Breathable lace.', 145000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776435/Best_Wig_Hairstyles_for_a_Natural___Stunning_Look_-_Fascinate_Names-removebg-preview_1_thrlbh.png', 'wigs'),
('Oceanic Deep Wave', '4x4 Deep Wave Natural Unit. Intricate, tight wave patterns with defined shine.', 125000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776434/4_4_deep_wave_nat__12_-removebg-preview_u0kx6h.png', 'wigs'),
('The Signature Baddie', 'Ultra-luxe HD lace front unit. High-density, premium virgin hair for high-fashion styling.', 598000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776433/_Free_Use__Baddie_Mannequin_HE-removebg-preview_nglp0c.png', 'wigs'),
('Toffee Melt Body Wave', 'Multi-tonal warm blonde tones with a classic body wave texture. 13x6 HD lace.', 385000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776434/download_-_2026-02-10T175054.907-removebg-preview_1_wvnuxk.png', 'wigs'),
('Rooted Ash Hollywood Glam', 'Rooted Ash Blonde Hollywood Wave. Luxury 13x6 HD Lace Front with vintage-inspired waves.', 450000, 'https://res.cloudinary.com/datw6p2gh/image/upload/v1771776432/Rooted_Ash_Blonde_Hollywood_Wave_Wig_-_13x6_HD_Lace_Front___Luxury_Custom_Unit-removebg-preview_etutyx.png', 'wigs')
ON CONFLICT DO NOTHING;
