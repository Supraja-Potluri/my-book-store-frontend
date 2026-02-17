import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import BookCard from "./BookCard";
import "./BookCarousel.css";

const BookCarousel = ({ title, books, onAdd, onSelectBook, wishlistItems = [], onWishlistToggle }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className="view-all">
          View All <ChevronRight size={16} />
        </div>
      </div>

      <div className="carousel-container">
        {showLeftArrow && (
          <button
            className="carousel-arrow left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div
          className="carousel-row"
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="carousel-item"
              onClick={() => onSelectBook?.(book)}
            >
              <BookCard
                book={book}
                onAdd={onAdd}
                showAdd={true}
                wishlistFilled={wishlistItems.some((item) => item.id === book.id)}
                onWishlistToggle={onWishlistToggle}
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            className="carousel-arrow right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default BookCarousel;
