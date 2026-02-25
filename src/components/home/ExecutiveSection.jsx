import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./ExecutiveSection.css";

const ExecutiveSection = ({ items = null }) => {
  const defaultItems = [
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958084/LUXY___Perfect_Hairline_Swiss_Lace_Frontal_Pixie_Wig___Outre_UK_xaj5pz.jpg",
      name: "The CEO Pixie",
    },
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958084/Sensationnel_Chicbob_lace_frontwig_-_Bob_unit_2_face_framing_glueless_wig_wide_5_inch_de_m1ozbn.jpg",
      name: "The Chic Bob",
    },
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958070/100_Short_Hair_Styles_Ideas_to_Choose_From_zorwuo.jpg",
      name: "The Power Pixie",
    },
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958015/33_Stunning_Sew-In_Hairstyles__Trendy_Looks_In_2026_lnjk7l.jpg",
      name: "The Executive Wave",
    },
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/30_Gorgeous_Short_Hairstyles_With_Bangs__Fresh_Fashionable_qz7udv.jpg",
      name: "The Boardroom Bob",
    },
    {
      url: "https://res.cloudinary.com/daekf2xyt/image/upload/v1770958013/Post_in_100_Human_Hair_Bundles_Soft_Natural_Long-Lasting_renhzj.jpg",
      name: "The Luxe Lob",
    },
  ];

  const slides =
    Array.isArray(items) && items.length ? items : defaultItems;

  const navigate = useNavigate();

  return (
    <section className="executive-section">
      <div className="executive-overlay" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="executive-container">
          <motion.div
            className="executive-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="executive-title">Executive Luxury Experience</h2>

            <div className="executive-divider" />

            <p className="executive-subtitle">
              Elevate your look with precision styling, flawless installations,
              and premium revamp services crafted for confident women who demand excellence.
            </p>
          </motion.div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          className="executive-swiper"
        >
          {slides.map((s, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="exec-card"
              >
                <div className="exec-media">
                  <img src={s.url} alt={s.name} />
                </div>

                <div className="exec-glass">
                  <h3>{s.name}</h3>
                  <button
                    onClick={() => navigate("/shop")}
                    className="exec-cta"
                  >
                    Shop Now
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExecutiveSection;
