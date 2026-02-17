// import "./LandingPage.css";
// import logo from "../assets/book_logo.png";
// import img1 from "../assets/books.avif";
// import img2 from "../assets/coffee-pile-books.avif";
// import img3 from "../assets/the-book-shop.avif";
// import img4 from "../assets/bookshop.jpg";

// const LandingPage = ({ onRegister }) => {
//   return (
//     <div className="landing">

//       {/* HEADER */}
//       <header className="header">
//         <div className="brand">
//           <img src={logo} alt="logo" />
//           <span>My Book Store</span>
//         </div>
//         <button className="register-btn" onClick={onRegister}>
//           Register
//         </button>
//       </header>

//       {/* HERO */}
//       <section className="hero">
//         <h1>Your Trusted Local Book Store</h1>
//         <p>
//           Helping students, parents, and readers find the right books —
//           with honest pricing and reliable service.
//         </p>
//       </section>

//       {/* IMAGE CAROUSEL */}
//       <section className="carousel">
//         <img src={img1} alt="Books" />
//         <img src={img2} alt="Reading" />
//         <img src={img3} alt="Store" />
//         <img src={img4} alt="Store" />
//         <img src={img1} alt="Books" />
//       </section>

//       {/* ABOUT */}
//       <section className="about">
//         <h2>About Us</h2>
//         <p>
//           My Book Store is a locally owned bookstore based in Vijayawada,
//           Andhra Pradesh. For years, we have been helping students, parents,
//           and readers find the right books — from academic textbooks to
//           competitive exam preparation and general reading.
//         </p>
//         <p>
//           Our goal is simple: make quality books easily accessible to everyone,
//           with honest pricing and reliable service.
//         </p>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="why">
//         <h2>Why Choose Us</h2>
//         <div className="features">
//           <div className="feature-card">
//             <span>📚</span>
//             <p>Wide range of academic & competitive books</p>
//           </div>
//           <div className="feature-card">
//             <span>🚚</span>
//             <p>Fast local delivery</p>
//           </div>
//           <div className="feature-card">
//             <span>💰</span>
//             <p>Affordable pricing</p>
//           </div>
//           <div className="feature-card">
//             <span>🤝</span>
//             <p>Trusted by students & parents</p>
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section className="contact">
//         <h2>Address & Contact</h2>
//         <p>
//           My Book Store<br />
//           Vijayawada, Andhra Pradesh<br />
//           +91 98765 43210
//         </p>
//       </section>

//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import { BookOpen, Truck, BadgeIndianRupee, Users, MapPin, Phone, Menu } from "lucide-react";
import logo from "../assets/book_logo.png";
import heroImg from "../assets/coffee-pile-books.avif"; // Use your main hero image here
import img1 from "../assets/books.avif";
import img2 from "../assets/the-book-shop.avif";
import img3 from "../assets/bookshop.jpg";

const LandingPage = ({ onRegister }) => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w * (1 / 3)));
      setActive(Math.max(0, Math.min(3, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onWinScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onWinScroll, { passive: true });
    onWinScroll();
    return () => window.removeEventListener("scroll", onWinScroll);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let i = 0;
    const run = () => {
      const w = el.clientWidth;
      el.scrollTo({ left: i * w * (1 / 3), behavior: "smooth" });
      i = (i + 1) % 4;
    };
    const t = setInterval(run, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="landing">
      {/* <div style={{background: 'yellow', color: 'black', padding: 16, fontWeight: 700, fontSize: 20, zIndex: 9999, position: 'relative'}}>DEBUG: LandingPage Rendered</div> */}
      {/* HEADER */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="brand">
          <img src={logo} alt="logo" />
          <span>My Book Store</span>
        </div>
        <div className="nav-links">
          <button className="register-btn" onClick={onRegister}>Register</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-container">
        <div className="hero-content">
          <h1>Your Trusted Local Book Store in Vijayawada</h1>
          <p>
            Academic, competitive exam, and general books — delivered reliably to your doorstep.
          </p>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Featured Books" />
        </div>
      </section>

      {/* GALLERY/CAROUSEL */}
      <section className="gallery">
        <div className="carousel">
          <div className="carousel-track" ref={trackRef}>
            <div className="carousel-item">
              <img src={img1} alt="Store front" />
            </div>
            <div className="carousel-item">
              <img src={img2} alt="Shelves" />
            </div>
            <div className="carousel-item">
              <img src={img3} alt="Owner" />
            </div>
            <div className="carousel-item">
              <img src={img1} alt="Inside" />
            </div>
            <div className="carousel-item">
              <img src={img2} alt="Shelves" />
            </div>
            <div className="carousel-item">
              <img src={img3} alt="Owner" />
            </div>
          </div>
          <div className="carousel-controls">
            <span className={`dot ${active === 0 ? "active" : ""}`} />
            <span className={`dot ${active === 1 ? "active" : ""}`} />
            <span className={`dot ${active === 2 ? "active" : ""}`} />
            <span className={`dot ${active === 3 ? "active" : ""}`} />
            <span className={`dot ${active === 4 ? "active" : ""}`} />
            <span className={`dot ${active === 5 ? "active" : ""}`} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About Us</h2>
        <div className="about-text">
          <p>
            My Book Store is a locally owned bookstore based in Vijayawada, Andhra Pradesh. 
            For years, we have been helping students, parents, and readers find the right books — 
            from academic textbooks to competitive exam preparation and general reading.
          </p>
          <p>
            Our goal is simple: make quality books easily accessible to everyone, 
            with honest pricing and reliable service.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <BookOpen className="icon" size={24} />
            <p>Wide range of academic & competitive books</p>
          </div>
          <div className="feature-card">
            <Truck className="icon" size={24} />
            <p>Fast local delivery</p>
          </div>
          <div className="feature-card">
            <BadgeIndianRupee className="icon" size={24} />
            <p>Affordable pricing</p>
          </div>
          <div className="feature-card">
            <Users className="icon" size={24} />
            <p>Trusted by students & parents</p>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <h3>Address & Contact</h3>
            <p><MapPin size={16} /> My Book Store</p>
            <p>[123 Example Road]</p>
            <p>Vijayawada, Andhra Pradesh</p>
            <p><Phone size={16} /> +91 98765 43210</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
