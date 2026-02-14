import BookCard from "./BookCard";

const BookCarousel = ({ title, books, onAdd }) => {
  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel-row">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
};

export default BookCarousel;
