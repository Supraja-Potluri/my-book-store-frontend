// import React, { useMemo } from 'react';
// import './SplashScreen.css';
// import bookLogo from '../assets/book_logo.png';

// const SplashScreen = ({ onGetStarted, onBack }) => {
//   const galleryUrls = useMemo(() => {
//     const modules = import.meta.glob('../assets/*.{jpg,jpeg,webp,avif}', { eager: true });
//     return Object.values(modules)
//       .map((m) => (typeof m === 'string' ? m : m.default))
//       .filter(Boolean);
//   }, []);

//   return (
//     <div className="landing-container">
//       <header className="landing-header">
//         <div className="brand">
//           <img src={bookLogo} alt="My Book Store Logo" className="brand-logo" />
//           <span className="brand-name">My Book Store</span>
//         </div>
//         <nav className="nav-links">
//           <a>Home</a>
//           <a>About</a>
//           <a>Contact</a>
//         </nav>
//         <button className="back-button" aria-label="Back" onClick={onBack}>←</button>
//       </header>

//       <section className="hero">
//         <div className="hero-text">
//           <h1>Your Trusted Local Book Store in Vijayawada</h1>
//           <p>
//             Academic, self-help, story and general books — delivered reliably to your doorstep.
//           </p>
//           {/* Explore button intentionally excluded */}
//         </div>
//         <div className="hero-art">
//           <div className="hero-art-circle">
//             <img src={bookLogo} alt="Books" className="hero-art-image" />
//           </div>
//         </div>
//       </section>

//       <section className="gallery">
//         {galleryUrls.length === 0 ? (
//           <>
//             <div className="gallery-item" />
//             <div className="gallery-item" />
//             <div className="gallery-item" />
//             <div className="gallery-item" />
//           </>
//         ) : (
//           galleryUrls.map((src, idx) => (
//             <img key={idx} src={src} alt="Gallery" className="gallery-image" />
//           ))
//         )}
//       </section>

//       <section className="about">
//         <h2>About Us</h2>
//         <p>
//           My Book Store is a locally owned bookstore based in Vijayawada, Andhra Pradesh. 
//           For years, we have been helping students, parents, and readers find the right books — 
//           from academic textbooks to competitive exam preparation and general reading.
//         </p>
//         <p>
//           Our goal is simple: make quality books easily accessible to everyone, with honest pricing 
//           and reliable service.
//         </p>
//       </section>

//       <section className="why">
//         <h2>Why Choose Us</h2>
//         <div className="features">
//           <div className="feature-card">Wide range of books</div>
//           <div className="feature-card">Fast local delivery</div>
//           <div className="feature-card">Affordable pricing</div>
//           <div className="feature-card">Trusted by many Users</div>
//         </div>
//       </section>

//       <section className="contact-cta">
//         <div className="contact">
//           <h3>Address & Contact</h3>
//           <p>
//             My Book Store<br />
//             [123 Example Road]<br />
//             Vijayawada, Andhra Pradesh<br />
//             +91 1234567890
//           </p>
//         </div>
//         <div className="cta">
//           <h3>Ready to explore our collection?</h3>
//           <button className="get-started-btn" onClick={onGetStarted}>
//             Get Started
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SplashScreen;

import { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/book-splash.json";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.container}>
      <Lottie animationData={animationData} loop={false} style={styles.lottie} />
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 400,
    height: 400,
  },
};

export default SplashScreen;
