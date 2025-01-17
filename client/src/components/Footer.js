import "../App.css";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  return (
    <Navbar className="custom-footer">
      <footer className="footer container">
        <span className="footer-text">@Copyright Projecte La Marató.</span>
      </footer>
    </Navbar>
  );
}

export default Footer;
