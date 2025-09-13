// src/components/FeaturedBooks.jsx
import React from 'react';
import BookCard from './BookCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx'; // Use existing spinner
import '../App.css'; // For shared styles

function FeaturedBooks({ books, loading, error }) {
    if (loading) {
        return (
            <div className="featured-section">
                <h2 className="section-title">Featured Books</h2>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="featured-section">
                <h2 className="section-title">Featured Books</h2>
                <p className="error-message">Failed to load featured books: {error}</p>
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="featured-section">
                <h2 className="section-title">Featured Books</h2>
                <p className="no-results">No featured books available at the moment.</p>
            </div>
        );
    }

    return (
        <section className="featured-section">
            <h2 className="section-title">Featured Books</h2>
            <div className="featured-book-list">
                {books.map((book) => (
                    <BookCard key={book.key || book.isbn?.[0] || book.title + (book.author_name?.[0] || '') + (book.first_publish_year || '') || Math.random()} book={book} />
                ))}
            </div>
        </section>
    );
}

export default FeaturedBooks;