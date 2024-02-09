import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "./Footer.css";

const Footer = () => {
  return (
      <footer className="bg-warning text-center text-lg-end text-black">
        <h5 className='footer-label'>Contact Us: <a className="footer-email-about" href="mailto:skillshop@email.com" style={{ color: 'black' }}>skillshop@email.com</a></h5>
        {/* added link to about */}
        <Link to="/about" className="footer-email-about" style={{ color: 'black' }}>About Us</Link> {/* Link to About page */}
      </footer>
  );
}

export default Footer;
