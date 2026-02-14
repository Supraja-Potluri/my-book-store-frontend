import "../styles/HomePage.css";
import { ArrowLeft } from "lucide-react";
import BookCard from "./BookCard";

const CartPage = ({ items, onBack }) => {
  const total = items.reduce((sum, b) => sum + (b.price || 0), 0);
  return (
    <div className="home">
      <header className="hp-header">
        <button className="hp-menu-btn" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="hp-brand">
          <span>My Cart</span>
        </div>
      </header>
      <section className="carousel-section">
        <h2>Items in Cart ({items.length})</h2>
        <div className="carousel-row">
          {items.map((book) => (
            <BookCard key={book.id + "-cart"} book={book} showAdd={false} />
          ))}
        </div>
        <div style={{ padding: "0 24px 24px 24px", fontWeight: 700 }}>
          Total: ₹{total}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
