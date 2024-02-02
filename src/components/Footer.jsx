import "./Footer.css";

const Footer = () => {
  return (
    // don't wrap around a section
      <footer className="bg-warning text-center text-lg-end text-black">
        <h5>Contact Us : <a href="mailto:skillshop@email.com" style={{ color: 'black' }}>skillshop@email.com</a></h5>
      </footer>
  );
}

export default Footer;