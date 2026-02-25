import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { motion } from "framer-motion";
import "./LongHairShowcase.css";

const IMAGES = [
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853480/Chelley_Bissainthe_nwdvbk.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853480/The_Perfect_Blend__How_to_Style_Ombre_Wigs_Like_a_Professional_mlg1d9.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853480/download_-_2026-02-10T173656.066_hop7tg.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853479/download_-_2026-02-10T174855.103_grimnn.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853479/download_-_2026-02-10T173721.766_npweni.jpg",
  "https://res.cloudinary.com/daekf2xyt/image/upload/v1770853479/arrogant_tae123_mmviks.jpg",
];

const makePairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] ?? arr[0]]);
  }
  return pairs;
};

export default function LongHairShowcase() {
  const pairs = makePairs(IMAGES);
  const swiperRef = useRef(null);

  return (
    <section className="longhair-section py-16 px-6">
      <div className="container-lh">

        {/* LEFT — IMAGE SLIDER (LARGER) */}
        <div className="slider-side">
          <div className="dual-card" style={{ maxWidth: 520 }}>
            <Swiper
              modules={[Autoplay, Navigation, EffectCreative]}
              effect="creative"
              creativeEffect={{
                prev: { shadow: true, translate: ["-10%", 0, -1] },
                next: { translate: ["100%", 0, 0] },
              }}
              loop
              autoplay={{ delay: 2800, disableOnInteraction: false }}
              speed={800}
              slidesPerView={1}
              className="lh-swiper"
              onSwiper={(s) => (swiperRef.current = s)}
            >
              {pairs.map((pair, i) => (
                <SwiperSlide key={i}>
                  <div className="dual-inner">
                    <div className="dual-image">
                      <img src={pair[0]} alt={`left-${i}`} />
                    </div>

                    <div className="dual-divider" />

                    <div className="dual-image">
                      <img src={pair[1]} alt={`right-${i}`} />
                    </div>

                    <button
                      className="inbox-arrow prev"
                      onClick={() => swiperRef.current?.slidePrev()}
                      aria-label="Previous"
                    >
                      ‹
                    </button>

                    <button
                      className="inbox-arrow next"
                      onClick={() => swiperRef.current?.slideNext()}
                      aria-label="Next"
                    >
                      ›
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <motion.div
          className="text-side"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="lh-heading">Luxury in Every Strand</h3>

          <div className="lh-divider" />

          <p className="lh-copy">
            Long hair isn’t just a style — it’s a statement of confidence,
            femininity, and timeless beauty. At Beauty by Kristine, every strand
            is crafted to flow with elegance, volume, and flawless perfection.
          </p>

          <div className="lh-btn-wrap">
            <Link to="/booking" className="btn-lux-primary">
              Book Now
            </Link>

            <Link to="/shop" className="btn-lux-outline">
              Explore Styles
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
