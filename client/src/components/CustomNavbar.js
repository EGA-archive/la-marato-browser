import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LoggedIn from "../components/SignIn/LoggedIn";

const CustomNavbar = ({ onClickHandler }) => {
  return (
    <Navbar className="custom-navbar">
      <Container className="navbar-container">
        <div className="navbar-column navbar-logo">
          <a
            className="lamaratologo"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img
              src="/../lamaratologo.png"
              className="lamaratologo"
              alt="lamaratologo"
            />
          </a>
        </div>
        <div className="navbar-column navbar-title">
          <h1 className="beacon-title">La Marató Beacon Network Browser</h1>
        </div>
        <div className="navbar-column navbar-empty"></div>
        <div className="navbar-column navbar-login">
          <LoggedIn onClickHandler={onClickHandler} />
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
