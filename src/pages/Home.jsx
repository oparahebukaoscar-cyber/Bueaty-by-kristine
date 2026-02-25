import React from "react";
import Hero from "../components/hero/Hero";
import DualImageSwiper from "../components/home/DualImageSwiper";
import LongHairShowcase from "../components/home/LongHairShowcase";
import ExecutiveSection from "../components/home/ExecutiveSection";
import MarqueeRibbon from "../components/common/MarqueeRibbon";

const Home = () => {
  return (
    <>
      <Hero />

      {/* --- MARQUEE RIBBON (between Hero and next section) --- */}
      <MarqueeRibbon
        phrases={[
          "✨ LUXURY HAIR COLLECTIONS ✨",
          "🚚 FREE SHIPPING ON ORDERS OVER ₦500k",
          "✨ NEW ARRIVALS JUST DROPPED ✨",
        ]}
        speedSeconds={20}
      />

      <DualImageSwiper />

      {/* --- SECOND MARQUEE RIBBON (between second and third section) --- */}
      <MarqueeRibbon
        backgroundColor="#000000"
        className="no-bottom"
        phrases={[
          "⚡ FAST DISPATCH ⚡",
          "💳 SECURE PAYMENTS 💳",
          "📞 DEDICATED SUPPORT 📞",
          "🎁 EXCLUSIVE OFFERS 🎁",
        ]}
        speedSeconds={18}
        style={{ marginTop: "20px" }}
      />

      <div className="tight-following">
        <LongHairShowcase />
      </div>

      {/* --- EXECUTIVE MARQUEE (wine + gold, sits directly above ExecutiveSection) --- */}
      <section className="marquee-ribbon">
        <div className="marquee-track" aria-hidden="false">
          <span>Luxury Wigs</span>
          <span>•</span>
          <span>Executive Installations</span>
          <span>•</span>
          <span>Revamp Appointments</span>
          <span>•</span>
          <span>Premium Beauty</span>
          <span>•</span>
          <span>Luxury Wigs</span>
          <span>•</span>
          <span>Executive Installations</span>
        </div>
      </section>

      {/* --- EXECUTIVE COLLECTION (editorial Swiper) --- */}
      <ExecutiveSection />
    </>
  );
};

export default Home;
