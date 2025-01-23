import "../App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <Navbar className="custom-footer">
      <Container className="container-footer">
        <footer className="footer">
          <span className="footer-text">@Copyright Projecte La Marató</span>
        </footer>
      </Container>
    </Navbar>
  );
}

export default Footer;
