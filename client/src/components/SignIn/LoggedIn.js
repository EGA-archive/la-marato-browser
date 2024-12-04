import React, { useState, useEffect } from "react";
import { useAuth } from "oidc-react";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const LoggedIn = ({ onClickHandler }) => {
  const [isActive, setIsActive] = useState(false);
  const [logoutIsActive, setLogoutIsActive] = useState(false);
  const auth = useAuth();

  const handleLoginClick = () => {
    onClickHandler();
    setIsActive(true);
  };

  // const handleLogoutClick = () => {
  //   auth.signOut();
  //   setLogoutIsActive(false); // Reset logout button state
  //   console.log("Login handleLogoutClick:", isActive)
  //   console.log("Logout handleLogoutClick:", logoutIsActive)
  // };

  console.log("This is my given_name:", auth.userData);

  const handleLogoutClick = () => {
    setLogoutIsActive(true);
  };
  useEffect(() => {
    if (logoutIsActive) {
      setTimeout(() => auth.signOut(), 600);
    }
  }, [logoutIsActive]);

  if (auth && auth.userData) {
    return (
      <div className="logout-button" onClick={handleLogoutClick}>
        <img src="/../userimage.png" alt="User" className="user-icon" />
        <strong>Hello, {auth.userData.profile.given_name}</strong> |{" "}
        <span className="logout-text"> Log Out</span>
      </div>
    );
  } else {
    // User is logged out, show the Log In button
    return (
      <button
        className={`login-button ${isActive ? "login-button-active" : ""}`} // Apply active class if isActive is true
        onClick={handleLoginClick}
      >
        <img
          src={isActive ? "/../userimagered.png" : "/../userimage.png"} // Use red image if active
          className="user-icon"
          alt="User Icon"
        />
        Log In
      </button>
    );
  }
};

export default LoggedIn;
