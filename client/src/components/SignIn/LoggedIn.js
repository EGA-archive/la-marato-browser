// client/src/components/SignIn/LoggedIn.js
import React, { useState, useEffect } from 'react';
import { useAuth } from 'oidc-react';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';

const LoggedIn = ({ onClickHandler }) => {
  const [isActive, setIsActive] = useState(false);
  const [logoutIsActive, setLogoutIsActive] = useState(false);
  const auth = useAuth();

  const handleLoginClick = () => {
    onClickHandler();
    setIsActive(true);
    console.log("Login handleLoginClick:", isActive) 
    console.log("Logout handleLoginClick:", logoutIsActive)
  };

  // const handleLogoutClick = () => {
  //   auth.signOut();
  //   setLogoutIsActive(false); // Reset logout button state
  //   console.log("Login handleLogoutClick:", isActive)
  //   console.log("Logout handleLogoutClick:", logoutIsActive)
  // };

const handleLogoutClick = () => {
  setLogoutIsActive(true);
}
useEffect(() => {
  if (logoutIsActive) {
    setTimeout(() => auth.signOut(), 600); 
    //      alert('You are logged out!')
    // window.location.hash = ''
  }
}, [logoutIsActive]);



  if (auth && auth.userData) {
    return (
  <button
    className={`logout-button ${logoutIsActive ? 'logout-button-active' : ''}`} // Apply active class if isActive is true
    onClick={handleLogoutClick}
  >
    <ExitToAppRoundedIcon
          style={{ color: logoutIsActive ? '#902B43' : '' }} // Icon color based on active state
    className="user-icon"
        />
        Log Out
  </button>

);
} else {
// User is logged out, show the Log In button
return (
  <button
    className={`login-button ${isActive ? 'login-button-active' : ''}`} // Apply active class if isActive is true
    onClick={handleLoginClick}
  >
    <img
      src={isActive ? '/../userimagered.png' : '/../userimage.png'} // Use red image if active
      className="user-icon"
      alt="User Icon"
    />
    Log In
  </button>
);
}
};

export default LoggedIn;
