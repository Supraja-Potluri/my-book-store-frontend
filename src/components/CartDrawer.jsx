import React, { useEffect } from "react";
import "../styles/HomePage.css";
import { X, Trash2 } from "lucide-react";
import BookCard from "./BookCard";

const CartDrawer = ({ open, onClose, items, onRemove, onQtyChange }) => {
  const [qty, setQty] = React.useState(items.map(() => 1));
  useEffect(() => {
    setQty(items.map(() => 1));
  }, [items]);
  const inc = (i) => {
    setQty((q) => q.map((v, idx) => (idx === i ? v + 1 : v)));
    onQtyChange && onQtyChange(i, qty[i] + 1);
  };
  const dec = (i) => {
    setQty((q) => q.map((v, idx) => (idx === i && v > 1 ? v - 1 : v)));
    onQtyChange && onQtyChange(i, qty[i] - 1);
  };
  const remove = (i) => {
    onRemove(i);
    setQty((q) => q.filter((_, idx) => idx !== i));
  };
  const total = items.reduce((sum, b, i) => sum + (b.price || 0) * (qty[i] || 1), 0);
  return (
    <div className={`cart-drawer${open ? " open" : ""}`}> 
      <div className="cart-drawer-header">
        <span>My Cart ({items.length})</span>
        <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart"><X size={22} /></button>
      </div>
      <div className="cart-drawer-content">
        <div className="cart-drawer-items" style={{ overflowY: 'auto', flex: 1 }}>
          {items.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            items.map((book, i) => (
              <div key={book.id + "-cart"} className="cart-drawer-item">
                <div className="cart-drawer-img" style={{ width: 100, height: 140 }}>
                  <img src={book.image} alt={book.title} />
                </div>
                <div className="cart-drawer-info" style={{ flex: 1, gap: 8 }}>
                  <div className="cart-drawer-title" style={{ fontSize: '1.12rem', fontWeight: 700, lineHeight: 1.3 }}>{book.title}</div>
                  <div className="cart-drawer-author" style={{ fontSize: '0.95rem' }}>{book.author}</div>
                  <div className="cart-drawer-rating" style={{ fontSize: '0.95rem' }}>★ {book.rating}</div>
                  <div className="cart-drawer-price" style={{ fontSize: '1.12rem', fontWeight: 700 }}>₹{book.price}</div>
                  <div className="cart-drawer-qty" style={{ marginTop: 6 }}>
                    <button onClick={() => dec(i)} disabled={qty[i] <= 1}>-</button>
                    <span>{qty[i]}</span>
                    <button onClick={() => inc(i)}>+</button>
                  </div>
                  <div className="cart-drawer-actions">
                    <button className="cart-drawer-remove" onClick={() => remove(i)}><Trash2 size={16} /> Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-summary" style={{ flexShrink: 0, borderTop: '1px solid #e8e8ed', borderLeft: 'none', minHeight: 'auto' }}>
          <h3>Order Summary</h3>
          <div className="cart-drawer-summary-row"><span>Total MRP</span><span>₹{total}</span></div>
          <div className="cart-drawer-summary-row"><span>Delivery</span><span>₹0</span></div>
          <div className="cart-drawer-summary-row"><span>GST</span><span>₹0</span></div>
          <div className="cart-drawer-summary-row total"><span>Payable</span><span>₹{total}</span></div>
          <button className="add-btn" style={{ marginTop: 10, width: "100%" }}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
