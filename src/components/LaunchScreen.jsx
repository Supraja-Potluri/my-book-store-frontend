import React from 'react';
import './LaunchScreen.css';
import bookLogo from '../assets/book_logo.png';

const LaunchScreen = () => {
  return (
    <div className="launch-container">
      <div className="launch-logo-wrapper">
        <img src={bookLogo} alt="My Book Store Logo" className="launch-logo-image" />
      </div>
    </div>
  );
};

export default LaunchScreen;
