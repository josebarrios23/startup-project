import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
  return (
      <footer className="bg-warning text-center text-lg-end text-black">
        <h5 className='footer-label'>Contact Us: <a className="footer-email-about" href="mailto:skillshop@email.com" style={{ color: 'black' }}>skillshop@email.com</a></h5>
        <Link to="/about" className="footer-email-about" style={{ color: 'black' }}>About Us</Link>
      </footer>
  );
}

export default Footer;
