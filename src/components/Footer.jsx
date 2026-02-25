import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Beauty by Kristine</h2>
          <p>
            Luxury wigs. Elegant transformations. Timeless beauty.
            Elevate your confidence with every strand.
          </p>

          <div className="footer-socials">
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Mail size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h4>Services</h4>
          <Link to="/booking">Wig Installations</Link>
          <Link to="/booking">Revamp Appointments</Link>
          <Link to="/shop">Luxury Wigs</Link>
          <Link to="/shop">Beauty Books</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="divider"></div>
        <p>© {new Date().getFullYear()} Beauty by Kristine. All rights reserved.</p>
      </div>
    </footer>
  );
}
