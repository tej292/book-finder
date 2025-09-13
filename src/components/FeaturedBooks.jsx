// src/components/FeaturedBooks.jsx
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

function FeaturedBooks() {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('fantasy'); // <-- State for selected category

    // Define some popular categories for the filter
    const categories = ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'History', 'Biography'];

    const fetchFeaturedBooks = async (category) => { // <-- Function now takes a category
        setLoading(true);
        setError(null);
        setFeaturedBooks([]);

        // <-- API call uses the selected category
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(category.toLowerCase())}&limit=8`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFeaturedBooks(data.docs.filter(book => book.title && (book.key || book.olid || book.id)).map(book => ({
                ...book,
                key: book.key || book.olid || book.id
            })));
        } catch (err) {
            setError(`Failed to fetch featured books: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // <-- useEffect to re-fetch when selectedCategory changes
    useEffect(() => {
        fetchFeaturedBooks(selectedCategory);
    }, [selectedCategory]); // Dependency array ensures re-fetch on category change

    return (
        <section className="featured-books-section">
            <h2 className="section-title">Featured Books</h2>

            {/* <-- Category Filter Buttons */}
            <div  className="category-filters" id="categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.toLowerCase())} // <-- Updates selectedCategory
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading && <LoadingSpinner />}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                featuredBooks.length > 0 ? (
                    <div className="featured-book-list">
                        {featuredBooks.map((book) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No featured books found for this category.</p>
                )
            )}
        </section>
    );
}

export default FeaturedBooks;