import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Beauty by Kristine</h3>
          <p>Luxury wigs & revamp services.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li>Bags</li>
            <li>Shoes</li>
            <li>Sneakers</li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Our Story</li>
            <li>Contact Us</li>
            {/* Admin link moved to footer bottom */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© 2026 Beauty by Kristine</p>
        <p className="footer-admin">
          <Link to="/admin">Beauty</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
