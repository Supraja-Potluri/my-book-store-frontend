import { Menu, Search, ShoppingCart, User, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/book_logo.png";
import bookshelfImg from "../assets/BookBanner.png";
import BookCarousel from "./BookCarousel";
import { trendingBooks, availableBooks, newArrivals, examPreparation } from "../data/books";
import "../styles/HomePage.css";

const HomePage = ({ user, cartCount, onAddToCart, onOpenCart, onNavigate, onSelectBook, wishlistItems = [], onWishlistToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Typewriter effect for hero banner - smooth continuous loop
  const heroTexts = [
    "Discover Your Next Great Read",
    "Discover Books That Shape Your Future",
    "Discover Stories That Stay With You"
  ];
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let timeout;

    const currentText = heroTexts[textIndex];
    
    const type = () => {
      if (!isDeleting) {
        // Typing: add one character at a time
        if (charIndex <= currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex));
          charIndex++;
          timeout = setTimeout(type, 80);
        } else {
          // Finished typing - pause briefly then start deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
            type();
          }, 500); // Pause 500ms after completing
        }
      } else {
        // Deleting: remove one character at a time
        if (charIndex >= 0) {
          setDisplayedText(currentText.substring(0, charIndex));
          charIndex--;
          timeout = setTimeout(type, 40);
        } else {
          // Finished deleting - move to next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % heroTexts.length);
        }
      }
    };

    timeout = setTimeout(type, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [textIndex, isDeleting]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const allBooks = [...trendingBooks, ...availableBooks, ...newArrivals, ...examPreparation];
      const results = allBooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.type.toLowerCase().includes(query)
      );
      if (results.length > 0) {
        console.log(`Found ${results.length} book(s) matching "${searchQuery}"`, results);
      } else {
        console.log(`No books found matching "${searchQuery}"`);
      }
      // You can add navigation to search results here
      // onNavigate?.('search', { query, results });
    }
  };

  const handleNavigateToProfile = () => {
    onNavigate?.("profile");
    setShowMenu(false);
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      onNavigate?.("landing");
      setShowMenu(false);
    }
  };

  return (
    <div className="home">
      {/* STICKY HEADER */}
      <header className="hp-header">
        <button 
          className="hp-menu-btn" 
          onClick={() => setShowMenu(!showMenu)} 
          aria-label="Menu"
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div className="hp-brand">
          <img src={logo} alt="My Book Store logo" />
          <span>My Book Store</span>
        </div>

        {/* SEARCH BAR */}
        <form className="hp-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search books, authors, exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" aria-label="Search" className="search-btn">
            <Search size={18} />
          </button>
        </form>

        {/* ACTION BUTTONS */}

        {/* Top bar icons with fill toggle */}
        <button
          className={`hp-action cart-btn${user?.cartFilled ? " active" : ""}`}
          onClick={onOpenCart}
          aria-label={`Shopping cart with ${cartCount} items`}
          title="View cart"
        >
          <ShoppingCart fill={user?.cartFilled ? "currentColor" : "none"} size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        <button
          className={`hp-action wishlist-btn${user?.wishlistFilled ? " active" : ""}`}
          onClick={() => onNavigate?.("wishlist")}
          aria-label="Wishlist"
          title="View wishlist"
        >
          <Heart fill={user?.wishlistFilled ? "currentColor" : "none"} size={20} />
        </button>

        <button
          className={`hp-action profile-btn${user?.profileFilled ? " active" : ""}`}
          onClick={() => { onNavigate?.("profile"); }}
          aria-label="Account"
          title={`Account: ${user?.name || "User"}`}
        >
          <User fill={user?.profileFilled ? "currentColor" : "none"} size={20} />
        </button>

        {/* SHOW WELCOME MESSAGE */}
        {user?.name && <span className="user-greeting">Hi, {user.name.split(" ")[0]}!</span>}
      </header>

      {/* MENU DROPDOWN */}
      {showMenu && (
        <div className="menu-dropdown">
          <nav className="menu-nav">
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Home</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Browse All Books</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Academic Books</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Exam Preparation</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Fiction & Stories</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setShowMenu(false); }}>Self Help & Motivation</a>
            <div className="menu-divider"></div>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); handleNavigateToProfile(); }}>My Profile</a>
            <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>Sign Out</a>
          </nav>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="hp-main">
        {/* HERO SECTION WITH BANNER */}
        <section className="hp-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.5) 100%), url(${bookshelfImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll" }}>
          <div className="hp-hero-overlay"></div>
          <div className="hp-hero-content" style={{ textAlign: "left", maxWidth: 700 }}>
            <h1 className="hp-hero-title">{displayedText}</h1>
            <p className="hp-hero-subtitle">Academic • Competitive • Self Help • Fiction</p>
            <button className="hp-cta-btn">
              Start Exploring
            </button>
          </div>
        </section>

        {/* BOOK CAROUSELS */}

        <BookCarousel
          title="Trending Books"
          books={trendingBooks}
          onAdd={onAddToCart}
          onSelectBook={onSelectBook}
          wishlistItems={wishlistItems}
          onWishlistToggle={onWishlistToggle}
        />

        <BookCarousel
          title="Available Books"
          books={availableBooks}
          onAdd={onAddToCart}
          onSelectBook={onSelectBook}
          wishlistItems={wishlistItems}
          onWishlistToggle={onWishlistToggle}
        />

        <BookCarousel
          title="New Arrivals"
          books={newArrivals}
          onAdd={onAddToCart}
          onSelectBook={onSelectBook}
          wishlistItems={wishlistItems}
          onWishlistToggle={onWishlistToggle}
        />

        <BookCarousel
          title="Exam Preparation"
          books={examPreparation}
          onAdd={onAddToCart}
          onSelectBook={onSelectBook}
          wishlistItems={wishlistItems}
          onWishlistToggle={onWishlistToggle}
        />

        {/* FEATURES SECTION */}
        <section className="hp-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M5 12l-3 3m3-3l-3-3m14 3l3 3m-3-3l3-3M9 5v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5"/>
              </svg>
            </div>
            <h3>Fast Delivery</h3>
            <p>Local delivery within 2-3 days</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Quality Guaranteed</h3>
            <p>100% genuine books from trusted publishers</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Best Prices</h3>
            <p>Affordable pricing with occasional discounts</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3>Customer Support</h3>
            <p>Dedicated support for all your queries</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="hp-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>My Book Store is your trusted local bookstore offering a wide range of books for all categories and readers.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#books">Books</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@mybookstore.com</p>
            <p>Phone: +91 XXXX XXXX XX</p>
            <p>Location: Vijayawada, Andhra Pradesh</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 My Book Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
