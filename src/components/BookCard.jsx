// src/components/BookCard.jsx - UPDATED for Z-Index Clarity
import React from 'react';

// Helper function to construct external URLs (these remain unchanged)
const getGoogleBooksUrl = (isbn, title, author) => {
    if (isbn) {
        return `https://www.google.com/search?tbm=bks&q=isbn:${isbn}`;
    }
    const query = encodeURIComponent(`${title} ${author ? author.join(' ') : ''}`);
    return `https://www.google.com/search?tbm=bks&q=${query}`;
};

const getAmazonSearchUrl = (isbn, title, author) => {
    if (isbn) {
        return `https://www.amazon.com/s?k=${isbn}`;
    }
    const query = encodeURIComponent(`${title} ${author ? author.join(' ') : ''}`);
    return `https://www.amazon.com/s?k=${query}`;
};

const getOpenLibraryBookUrl = (ol_id) => {
    if (ol_id) {
        return `https://openlibrary.org${ol_id}`;
    }
    return null;
};


function BookCard({ book }) {
    const coverId = book.cover_i;
    const coverUrl = coverId ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/180x250?text=No+Cover';

    const isbn = book.isbn?.[0];
    const title = book.title;
    const author = book.author_name;
    const olId = book.key;

    const googleBooksLink = getGoogleBooksUrl(isbn, title, author);
    const amazonLink = getAmazonSearchUrl(isbn, title, author);
    const openLibraryLink = getOpenLibraryBookUrl(olId);

    return (
        <div className="book-card">
            {/* Added a new container for content to ensure it's above pseudo-elements */}
            <div className="book-card-content">
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

                    <div className="book-card-actions">
                        {googleBooksLink && (
                            <a href={googleBooksLink} target="_blank" rel="noopener noreferrer" className="action-button google-books">
                                View on Google Books
                            </a>
                        )}
                        {amazonLink && (
                            <a href={amazonLink} target="_blank" rel="noopener noreferrer" className="action-button amazon">
                                Buy on Amazon
                            </a>
                        )}
                        {openLibraryLink && (
                            <a href={openLibraryLink} target="_blank" rel="noopener noreferrer" className="action-button open-library">
                                More on Open Library
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookCard;