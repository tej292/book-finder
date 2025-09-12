// src/components/BookCard.jsx
import React from 'react';

function BookCard({ book }) {
    const coverId = book.cover_i;
    const coverUrl = coverId ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Cover';

    return (
        <div className="book-card">
            <img src={coverUrl} alt={`Cover of ${book.title}`} className="book-card-cover" />
            <div className="book-card-details">
                <h3 className="book-card-title">{book.title || 'Unknown Title'}</h3>
                <p className="book-card-author">
                    Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                </p>
                <p className="book-card-info">
                    First Published: {book.first_publish_year || 'N/A'}
                </p>
                <p className="book-card-info">
                    Publisher(s): {book.publisher ? book.publisher.join(', ') : 'N/A'}
                </p>
            </div>
        </div>
    );
}

export default BookCard;