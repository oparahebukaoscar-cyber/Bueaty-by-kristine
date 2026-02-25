import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const images = [
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958077/Outre_Perfect_Hairline_Swoop_Series_HD_Transparent_Lace_Front_Wig_-_SWOOP14_-_DRST4_GINGER_SPICE_plppdi.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958070/Outre_Glueless_HD_Lace_Front_Wig_-_BRUNA_ezzpih.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958070/Outre_Glueless_HD_Lace_Front_Wig_-_BRUNA_1_hzxkmo.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/download_-_2026-02-10T172447.883_foheto.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/download_-_2026-02-10T172455.261_rw5vp0.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/Post_in_100_Human_Hair_Bundles_Soft_Natural_Long-Lasting_renhzj.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/24_Short_Hairstyles_for_Black_Women_That_Radiate_Confidence_and_Beauty_-_Spesh_View_fdpjav.jpg"
];

const About = () => {
  // stats targets (main value and recent change)
  const stats = [
    { id: 1, label: 'Customer Satisfaction Rate', main: 95, change: 3, desc: 'High satisfaction from attentive service and premium materials.' },
    { id: 2, label: 'Repeat Clients', main: 32, change: 8, desc: 'Clients return for consistent quality and personalized care.' },
    { id: 3, label: 'Return Rate', main: 5, change: -5, desc: 'Return rate is low; we continuously refine our processes.' }
  ];

  const [countsMain, setCountsMain] = useState(stats.map(() => 0));
  const [countsChange, setCountsChange] = useState(stats.map(() => 0));

  useEffect(() => {
    const mainTimers = stats.map((s, idx) => {
      const target = Math.abs(s.main);
      const duration = 1000 + idx * 200;
      const steps = 40;
      const increment = Math.max(1, Math.ceil(target / steps));
      let current = 0;
      const id = setInterval(() => {
        current += increment;
        setCountsMain(prev => {
          const next = [...prev];
          next[idx] = Math.min(target, current);
          return next;
        });
        if (current >= target) clearInterval(id);
      }, Math.round(duration / steps));
      return id;
    });

    const changeTimers = stats.map((s, idx) => {
      const target = Math.abs(s.change);
      const duration = 700;
      const steps = 20;
      const increment = Math.max(1, Math.ceil(target / steps));
      let current = 0;
      const id = setInterval(() => {
        current += increment;
        setCountsChange(prev => {
          const next = [...prev];
          next[idx] = Math.min(target, current) * (s.change < 0 ? -1 : 1);
          return next;
        });
        if (current >= target) clearInterval(id);
      }, Math.round(duration / steps));
      return id;
    });

    return () => {
      mainTimers.forEach(t => clearInterval(t));
      changeTimers.forEach(t => clearInterval(t));
    };
  }, []);

  return (
    <div className="about-page">
      <header className="about-hero">
        <motion.div className="about-hero-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-copy">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >About Beauty by Kristine</motion.h1>

            <motion.p className="lead"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            >Luxury hair artistry crafted to elevate confidence, elegance, and executive presence.</motion.p>

            <div className="divider" aria-hidden></div>
          </div>

          <div className="hero-image-wrap">
            <motion.div className="image-frame"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              aria-hidden
            >
              <motion.img src={images[0]} alt="Beauty by Kristine" className="hero-img"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </header>

      <main className="about-content">
        <section className="brand-story">
          <div className="brand-media">
            <motion.img src={images[1]} alt="Brand" className="brand-img" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} />
          </div>
          <div className="brand-text">
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>Our Story</motion.h2>
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06 }} viewport={{ once: true }}>
              Founded on an obsession with detail, Beauty by Kristine blends artisanal wig-making with modern luxury. We source premium materials and employ meticulous craftsmanship so every piece feels natural, refined, and unmistakably premium.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} viewport={{ once: true }}>
              We believe that elegance is a practice—one that starts with how you present yourself to the world. Our work is a partnership: we listen, advise, and deliver a finished result that enhances your confidence.
            </motion.p>
          </div>
        </section>

        <section className="mission-cards">
          <motion.div className="mission-cards motion-container"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } }
            }}
          >
            {stats.map((s, i) => {
              const change = countsChange[i];
              const isPositive = change >= 0;
              return (
                <motion.div className="stat-card" key={s.id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
                  <div className={`stat-pill`} aria-hidden>
                    <span className={`pill-value ${isPositive ? 'pill-positive' : 'pill-negative'}`}>
                      {change > 0 ? `+${change}%` : `${change}%`}
                    </span>
                    <span className={`pill-arrow ${isPositive ? 'pill-positive' : 'pill-negative'}`}>{isPositive ? '↑' : '↓'}</span>
                  </div>

                  <div className="stat-main">{countsMain[i]}%</div>
                  <h3>{s.label}</h3>
                  <p className="stat-desc">{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="about-cta">
          <div className="cta-inner">
            <div>
              <h3>Experience the Kristine standard</h3>
              <p>Ready to elevate your look? Explore the collection or book an appointment with our executive stylists.</p>
            </div>
            <div className="cta-actions">
              <Link to="/shop" className="cta-btn">Shop Collection</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;