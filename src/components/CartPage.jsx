import "../styles/HomePage.css";
import { ArrowLeft, Trash2 } from "lucide-react";
import BookCard from "./BookCard";
import React from "react";

const CartPage = ({ items, onBack, onRemove }) => {
  const [qty, setQty] = React.useState(items.map(() => 1));
  const inc = (i) => setQty((q) => q.map((v, idx) => (idx === i ? v + 1 : v)));
  const dec = (i) => setQty((q) => q.map((v, idx) => (idx === i && v > 1 ? v - 1 : v)));
  const remove = (i) => {
    onRemove(i);
    setQty((q) => q.filter((_, idx) => idx !== i));
  };
  const total = items.reduce((sum, b, i) => sum + (b.price || 0) * (qty[i] || 1), 0);
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
          {items.map((book, i) => (
            <div key={book.id + "-cart"} style={{ display: "grid" }}>
              <BookCard book={book} showAdd={false} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button className="arrow-btn" onClick={() => dec(i)} aria-label="Decrease">−</button>
                  <span>{qty[i]}</span>
                  <button className="arrow-btn" onClick={() => inc(i)} aria-label="Increase">+</button>
                </div>
                <button className="arrow-btn" onClick={() => remove(i)} aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <aside style={{ padding: 24, display: "grid", gap: 8, maxWidth: 360 }}>
          <div style={{ border: "1px solid #efeff4", borderRadius: 12, background: "#fff", boxShadow: "0 8px 16px rgba(0,0,0,0.06)", padding: 16 }}>
            <h3 style={{ margin: "0 0 10px 0" }}>Order Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Total MRP</span><span>₹{total}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Delivery</span><span>₹0</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>GST</span><span>₹0</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}><span>Payable</span><span>₹{total}</span></div>
            <button className="add-btn" style={{ marginTop: 10 }}>Proceed to Checkout</button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CartPage;
