import { ArrowLeft, Trash2 } from "lucide-react";
import BookCard from "./BookCard";
import "./WishlistPage.css";

const WishlistPage = ({ items, onBack, onAddToCart, onRemove }) => {
  return (
    <div className="wishlist-page">
      {/* HEADER */}
      <header className="wishlist-header">
        <button
          className="back-btn"
          onClick={onBack}
          aria-label="Go back"
          title="Go back to home"
        >
          <ArrowLeft size={22} />
        </button>
        <h1>My Wishlist</h1>
        <span className="item-count">{items.length} {items.length === 1 ? "item" : "items"}</span>
      </header>

      {/* MAIN CONTENT */}
      <main className="wishlist-main">
        {items.length > 0 ? (
          <div className="wishlist-grid">
            {items.map((book) => (
              <div key={book.id} className="wishlist-item">
                <BookCard book={book} onAdd={onAddToCart} showAdd={true} />
                <button
                  className="remove-btn"
                  onClick={() => onRemove(book.id)}
                  aria-label="Remove from wishlist"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Add items to your wishlist to save them for later</p>
            <button
              className="continue-shopping-btn"
              onClick={onBack}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
