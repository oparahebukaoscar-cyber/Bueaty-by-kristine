import React from "react";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="w-full bg-accent min-h-[40vh] sm:min-h-[50vh] px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-12 font-[Inter]">

      {/* Top Brand + Navigation */}
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center mb-10 sm:mb-16">

        {/* Brand Name */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl tracking-wide text-primary"
          style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
        >
          BEAUTY BY KRISTINE
        </h1>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative transition duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-black hover:text-primary"
              }`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Brand Statement */}
      <div className="max-w-xl">
        <p className="text-lg sm:text-xl text-black leading-relaxed mb-4 sm:mb-5">
          Refined hair artistry for women who lead with presence.
        </p>

        <p className="text-xs sm:text-sm text-primary tracking-wide mb-7 sm:mb-10">
          Precision styling. Elevated confidence. Timeless luxury.
        </p>

        {/* Modern CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">

          {/* Primary CTA */}
          <Link
            to="/shop"
            className="relative w-full sm:w-auto text-center min-h-[44px] px-6 sm:px-8 py-3 text-sm tracking-widest text-white bg-primary overflow-hidden group"
          >
            <span className="relative z-10">SHOP COLLECTION</span>
            <span className="absolute inset-0 bg-primaryDark translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/booking"
            className="w-full sm:w-auto text-center min-h-[44px] px-6 sm:px-8 py-3 text-sm tracking-widest border border-black text-black hover:border-primary hover:text-primary transition-all duration-300"
          >
            BOOK APPOINTMENT
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Hero;