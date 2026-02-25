import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "./DualImageSwiper.css";

const images = [
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843223/download_-_2026-02-10T174513.527_jpr4h7.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843223/download_-_2026-02-10T174424.578_hf2equ.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843223/download_-_2026-02-10T174234.951_kgscsu.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843224/download_-_2026-02-10T174226.439_xuzsnf.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843224/download_-_2026-02-10T174436.387_c6c7ui.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843224/Balayage_Hair_Perfection_Awaits_Black_Friday_Savings_Inside_iqtwfl.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843224/download_-_2026-02-10T174326.338_ly3bul.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843225/Midnight_Curl_Fantasy___Meet_Yolanda_gw7wla.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843225/download_-_2026-02-10T174202.003_atuvhj.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843226/Sleek_Perfection_Glossy_Glow___Meet_Selena_rbyabv.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843226/download_-_2026-02-10T174304.503_yunxct.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770843227/Golden_Spiral_Glow___Meet_Camila_jdmatc.jpg",
];

// Pair images
const makePairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] ?? arr[0]]);
  }
  return pairs;
};

export default function DualImageSwiper() {
  const pairs = makePairs(images);
  const boxCount = Math.min(6, pairs.length);
  const initialIndexes = Array.from({ length: boxCount }, (_, i) => i);

  return (
    <section className="revamp-section">
      <div className="revamp-header">
        <h2>Revamp Transformations</h2>
        <p>
          Luxury wigs and flawless hair revamps crafted to perfection.
        </p>
        <div className="revamp-divider"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={900}
          grabCursor
          spaceBetween={25}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {initialIndexes.map((startIndex, cardIdx) => (
            <SwiperSlide key={cardIdx}>
              <ImageBox pairs={pairs} startIndex={startIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function ImageBox({ pairs, startIndex }) {
  const [index, setIndex] = useState(startIndex ?? 0);

  const prev = () =>
    setIndex((i) => (i - 1 + pairs.length) % pairs.length);
  const next = () =>
    setIndex((i) => (i + 1) % pairs.length);

  const pair = pairs[index] || ["", ""];

  return (
    <div className="image-box-wrapper">
      <div className="image-box">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="image-flex"
          >
            <div className="image-half">
              <img src={pair[0]} alt="left" />
            </div>

            <div className="image-divider"></div>

            <div className="image-half">
              <img src={pair[1]} alt="right" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
        <button onClick={prev} className="nav-btn left">
          ‹
        </button>
        <button onClick={next} className="nav-btn right">
          ›
        </button>
      </div>
    </div>
  );
}
