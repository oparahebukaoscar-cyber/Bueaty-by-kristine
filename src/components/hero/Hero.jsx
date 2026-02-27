import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import "@fontsource/playfair-display/700.css";
import "@fontsource/inter";

const images = [
  "https://res.cloudinary.com/datw6p2gh/image/upload/v1772157020/Intentional_branding_starts_with_visuals_that_speak_dqr2vv.jpg",
  "https://res.cloudinary.com/datw6p2gh/image/upload/v1772157020/download_-_2026-02-27T024339.416_tfqpu6.jpg",
  "https://res.cloudinary.com/datw6p2gh/image/upload/v1772157020/enjoy_some_freebies_tag_us_if_you_use_them_fal6nt.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // rotate images every 4.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // For cursor tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center filter brightness-75"
          style={{ backgroundImage: `url(${images[current]})` }}
        />
      </AnimatePresence>

      {/* Glassy overlay for luxury vibe */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Centered Brand */}
      <div
        onMouseMove={handleMouseMove}
        className="relative z-20 flex items-center justify-center h-full"
      >
        <motion.h1
          style={{ rotateX, rotateY, fontFamily: '"Playfair Display", serif' }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white text-center leading-tight select-none tracking-wide"
        >
          BEAUTY
          <br />
          BY
          <br />
          KRISTINE
        </motion.h1>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/80 tracking-widest"
      >
        SCROLL DOWN
      </motion.div>
    </div>
  );
};

export default Hero;