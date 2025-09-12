// src/App.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx'; // Consistent .jsx import
import BookList from './components/BookList.jsx';   // Consistent .jsx import
import LoadingSpinner from './components/LoadingSpinner.jsx'; // Consistent .jsx import
import './App.css'; // Import global styles

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSearch, setCurrentSearch] = useState({ type: '', query: '' });

    const fetchBooks = async (searchType, query) => {
        setLoading(true);
        setError(null);
        setBooks([]); // Clear previous results

        const searchParamMap = {
            'title': 'title',
            'author': 'author',
            'subject': 'subject',
            'isbn': 'isbn',
            'publisher': 'publisher',
            'first_publish_year': 'first_publish_year'
        };

        if (!searchParamMap[searchType]) {
            setError("Invalid search type selected.");
            setLoading(false);
            return;
        }

        const url = `https://openlibrary.org/search.json?${searchParamMap[searchType]}=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Filter out books that don't have a title, as they are not very useful
            setBooks(data.docs.filter(book => book.title));
        } catch (err) {
            setError(`Failed to fetch books: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Effect to trigger search when currentSearch changes
    useEffect(() => {
        if (currentSearch.type && currentSearch.query) {
            fetchBooks(currentSearch.type, currentSearch.query);
        }
    }, [currentSearch]);

    const handleSearch = (type, query) => {
        setCurrentSearch({ type, query });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Alex's Book Finder</h1>
            </header>
            <SearchBar onSearch={handleSearch} />
            <main className="App-main">
                {loading && <LoadingSpinner />}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && <BookList books={books} />}
            </main>
        </div>
    );
}

export default App;