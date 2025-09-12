// src/components/BookList.jsx
import React from 'react';
import BookCard from './BookCard.jsx'; // Consistent .jsx import

function BookList({ books }) {
    if (!books || books.length === 0) {
        return <p className="no-results">No books found. Try a different search!</p>;
    }

    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard key={book.key || book.isbn?.[0] || book.title + (book.author_name?.[0] || '') + (book.first_publish_year || '') || Math.random()} book={book} />
            ))}
        </div>
    );
}

export default BookList;