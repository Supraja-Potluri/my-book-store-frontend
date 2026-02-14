import { Star, ShoppingCart } from "lucide-react";

const BookCard = ({ book, onAdd, showAdd = true }) => {
  return (
    <div className="book-card">
      <div className="book-thumb">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-info">
        <h4>{book.title}</h4>
        <div className="book-meta">
          <span className="price">₹{book.price}</span>
          <span className="rating">
            <Star size={14} /> {book.rating}
          </span>
        </div>
        {showAdd && (
          <button className="add-btn" onClick={() => onAdd?.(book)}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
