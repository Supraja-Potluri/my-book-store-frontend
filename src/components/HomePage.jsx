// import React from "react";
// import "./HomePage.css";
// import { Menu, Search, ShoppingCart, User, ChevronRight, Star } from "lucide-react";
// import logo from "../assets/book_logo.png";
// import img1 from "../assets/books.avif";
// import img2 from "../assets/the-book-shop.avif";
// import img3 from "../assets/bookshop.jpg";

// const HomePage = () => {
//   return (
//     <div className="home">
//       <header className="hp-header">
//         <button className="hp-menu-btn" aria-label="Menu">
//           <Menu size={20} />
//         </button>
//         <div className="hp-brand">
//           <img src={logo} alt="logo" />
//           <span>My Book Store</span>
//         </div>
//         <div className="hp-search">
//           <input placeholder="Search books, authors, exams…" />
//           <Search size={18} className="icon" />
//         </div>
//         <button className="hp-action" aria-label="Cart">
//           <ShoppingCart size={20} />
//         </button>
//         <button className="hp-action" aria-label="Account">
//           <User size={20} />
//         </button>
//       </header>

//       <section className="hp-hero">
//         <div className="hp-hero-card">
//           <h1>Discover Books For Every Journey</h1>
//           <p>Browse academic, competitive, and general titles curated for you.</p>
//           <button className="hp-cta">
//             Explore Now <ChevronRight size={18} />
//           </button>
//         </div>
//         <div className="hp-hero-card">
//           <h1>Daily Deals</h1>
//           <p>Save on bestsellers and exam prep essentials.</p>
//           <button className="hp-cta">
//             View Offers <ChevronRight size={18} />
//           </button>
//         </div>
//       </section>

//       <div className="hp-categories">
//         <span className="hp-chip active">All</span>
//         <span className="hp-chip">Academic</span>
//         <span className="hp-chip">Competitive Exams</span>
//         <span className="hp-chip">Self Help</span>
//         <span className="hp-chip">Fiction</span>
//         <span className="hp-chip">Kids</span>
//       </div>

//       <section className="hp-grid">
//         <article className="hp-card">
//           <img src={img1} alt="Books" />
//           <div className="info">
//             <div className="title">Essential Exam Guide</div>
//             <div className="meta">
//               <span className="hp-price">₹499</span>
//               <span className="hp-rating"><Star size={16} />4.6</span>
//             </div>
//             <button className="hp-add">Add to Cart</button>
//           </div>
//         </article>
//         <article className="hp-card">
//           <img src={img2} alt="Shelf" />
//           <div className="info">
//             <div className="title">Modern Fiction Set</div>
//             <div className="meta">
//               <span className="hp-price">₹799</span>
//               <span className="hp-rating"><Star size={16} />4.4</span>
//             </div>
//             <button className="hp-add">Add to Cart</button>
//           </div>
//         </article>
//         <article className="hp-card">
//           <img src={img3} alt="Shop" />
//           <div className="info">
//             <div className="title">Reading Essentials Pack</div>
//             <div className="meta">
//               <span className="hp-price">₹599</span>
//               <span className="hp-rating"><Star size={16} />4.7</span>
//             </div>
//             <button className="hp-add">Add to Cart</button>
//           </div>
//         </article>
//         <article className="hp-card">
//           <img src={img1} alt="Books" />
//           <div className="info">
//             <div className="title">Study Planner Combo</div>
//             <div className="meta">
//               <span className="hp-price">₹449</span>
//               <span className="hp-rating"><Star size={16} />4.5</span>
//             </div>
//             <button className="hp-add">Add to Cart</button>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };


// export default HomePage;

import "../styles/HomePage.css";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import logo from "../assets/book_logo.png";
import BookCarousel from "./BookCarousel";
import { trendingBooks, availableBooks } from "../data/books";
import { useEffect, useState } from "react";
import heroImg from "../assets/BookCarousel.png";
import MenuDropdown from "./MenuDropdown";

const HomePage = ({ user, cartCount, onAddToCart, onOpenCart }) => {
  const [typed, setTyped] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const text = "Discover books that shape your future";
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % (text.length + 1);
      setTyped(text.slice(0, i));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* HEADER */}
      <header className="hp-header">
        <button className="hp-menu-btn" aria-label="Menu" onClick={() => setShowMenu((v) => !v)}>
          <Menu size={20} />
        </button>
        <div className="hp-brand">
          <img src={logo} alt="logo" />
          <span>My Book Store</span>
        </div>
        <div className="hp-search">
          <input placeholder="Search books, authors, exams..." />
          <Search size={18} className="icon" />
        </div>
        <button className="hp-action" aria-label="Cart" onClick={onOpenCart}>
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="hp-action" aria-label="Account">
          <User size={20} />
        </button>
        {user?.name && <span className="user-name">{user.name}</span>}
      </header>
      {showMenu && <MenuDropdown />}

      {/* HERO BANNER */}
      <div className="hp-hero-banner">
        <img src={heroImg} alt="Books banner" />
        <div className="hp-hero-text">
          {typed}
          <div className="hp-hero-sub">Academic • Competitive • Self Help • Fiction</div>
        </div>
      </div>

      {/* CAROUSELS */}
      <BookCarousel title="🔥 Trending Books" books={trendingBooks} onAdd={onAddToCart} />
      <BookCarousel title="📚 Available Books" books={availableBooks} onAdd={onAddToCart} />
      <BookCarousel title="🎯 Best for Competitive Exams" books={trendingBooks} onAdd={onAddToCart} />
    </div>
  );
};

export default HomePage;
