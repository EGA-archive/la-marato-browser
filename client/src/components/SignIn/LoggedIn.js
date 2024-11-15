// client/src/components/SignIn/LoggedIn.js
import React, { useState } from 'react';
import { useAuth } from 'oidc-react';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const LoggedIn = ({ onClickHandler, imageSrc, setImageSrc }) => {
  const [isActive, setIsActive] = useState(false);
  const auth = useAuth();

  const handleLoginClick = () => {
    onClickHandler();
    setIsActive(true);
    console.log("Button active state:", isActive)
  };

  // const handleLoginRelease = () => {
  //   setImageSrc('/../userimage.png');
  // };

  if (auth && auth.userData) {
    return (
  <button onClick={() => {
    auth.signOut();
    setIsActive(false); // Reset active state on logout
  }} className="logout-button">
    <ExitToAppRoundedIcon className="user-icon" alt="Quit Icon" /> Log Out
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
