import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import "./BookCard.css";


// Accept wishlistFilled and onWishlistToggle as props
const BookCard = ({ book, onAdd, showAdd = true, wishlistFilled = false, onWishlistToggle }) => {
  const { title, price, rating, type, author } = book;
  const [added, setAdded] = useState(false);

  const handleWishlistClick = () => {
    onWishlistToggle?.(book);
  };

  const handleAddCart = () => {
    setAdded(true);
    onAdd?.(book);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="book-card" style={{ width: 260, minHeight: 420 }}>
      <div className="book-thumb" style={{ height: 320, padding: 16 }}>
        <img src={book.image} alt={title} style={{ borderRadius: 10, background: "#fff", padding: 8, boxSizing: "border-box", width: "100%", height: "100%", objectFit: "contain" }} />
        <button
          className={`wish${wishlistFilled ? " active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={wishlistFilled ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlistFilled ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart fill={wishlistFilled ? "currentColor" : "none"} size={26} />
        </button>
      </div>
      <div className="book-info" style={{ fontSize: "1.08rem", gap: 10 }}>
        {type && <div className="book-type" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e87a3f", textTransform: "uppercase", letterSpacing: "0.5px" }}>{type}</div>}
        <h4 title={title} style={{ fontSize: "1.05rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h4>
        {author && <div className="author" title={author} style={{ fontSize: "0.98rem" }}>{author}</div>}
        <div className="rating-row" style={{ fontSize: "0.95rem" }}>
          <span className="stars">★</span>
          <span className="rating-val">{rating}</span>
        </div>
        <div className="price-section">
          <span className="price" style={{ fontSize: "1.18rem" }}>₹{price}</span>
          {showAdd && (
            <button
              className={`cart-icon${added ? " added" : ""}`}
              onClick={handleAddCart}
              title={added ? "Added to cart" : "Add to cart"}
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
