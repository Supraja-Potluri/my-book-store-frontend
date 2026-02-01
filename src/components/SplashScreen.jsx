import React from 'react';
import './SplashScreen.css';
import bookLogo from '../assets/book_logo.png';

const SplashScreen = ({ onGetStarted }) => {
  return (
    <div className="splash-container">
      <div className="content-wrapper">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={bookLogo} alt="My Book Store Logo" className="logo-image" />
          </div>
        </div>
        
        <h1 className="app-title">My Book Store</h1>
        <br></br>
        <p className="app-subtitle">Books Delivered To Your Door</p>
        <br></br>
        <div className="action-area">
          <button className="get-started-btn" onClick={onGetStarted}>
            Get Started
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
