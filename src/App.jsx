// src/App.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import BookList from './components/BookList.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import FeaturedBooks from './components/FeaturedBooks.jsx'; // Import the new component
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSearch, setCurrentSearch] = useState({ type: '', query: '' });

    // State for featured books
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [featuredLoading, setFeaturedLoading] = useState(true);
    const [featuredError, setFeaturedError] = useState(null);

    // Function to fetch books (reused for both search and featured)
    const genericFetchBooks = async (searchType, query) => {
        const searchParamMap = {
            'title': 'title',
            'author': 'author',
            'subject': 'subject',
            'isbn': 'isbn',
            'publisher': 'publisher',
            'first_publish_year': 'first_publish_year'
        };

        if (!searchParamMap[searchType]) {
            throw new Error("Invalid search type provided for fetch.");
        }

        const url = `https://openlibrary.org/search.json?${searchParamMap[searchType]}=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.docs.filter(book => book.title); // Filter out books without titles
    };


    // --- Effect for regular search ---
    useEffect(() => {
        if (currentSearch.type && currentSearch.query) {
            const fetchAndSetBooks = async () => {
                setLoading(true);
                setError(null);
                setBooks([]);
                try {
                    const fetched = await genericFetchBooks(currentSearch.type, currentSearch.query);
                    setBooks(fetched);
                } catch (err) {
                    setError(`Failed to fetch books: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            };
            fetchAndSetBooks();
        }
    }, [currentSearch]);


    // --- Effect for fetching featured books on initial load ---
    useEffect(() => {
        const fetchFeatured = async () => {
            setFeaturedLoading(true);
            setFeaturedError(null);
            try {
                // Example featured books: 'Dune', 'Pride and Prejudice', 'The Hitchhiker's Guide to the Galaxy'
                // You can customize this array of queries.
                const featuredQueries = [
                    { type: 'title', query: 'Dune' },
                    { type: 'title', query: 'Pride and Prejudice' },
                    { type: 'title', query: 'The Hitchhiker\'s Guide to the Galaxy' },
                    { type: 'title', query: 'The Great Gatsby' }
                ];

                const allFeaturedResults = await Promise.all(
                    featuredQueries.map(q => genericFetchBooks(q.type, q.query))
                );

                // Take the first useful result from each query for simplicity
                const compiledFeatured = allFeaturedResults
                    .map(results => results.length > 0 ? results[0] : null)
                    .filter(Boolean); // Remove any nulls

                setFeaturedBooks(compiledFeatured);

            } catch (err) {
                setFeaturedError(`Failed to load featured books: ${err.message}`);
            } finally {
                setFeaturedLoading(false);
            }
        };

        fetchFeatured();
    }, []); // Empty dependency array means this runs once on mount


    const handleSearch = (type, query) => {
        // Only set search if there's an actual query to prevent
        // triggering a blank search when component mounts.
        if (query.trim()) {
            setCurrentSearch({ type, query });
        }
    };

    // Determine whether to show search results or featured books
    const showSearchResults = currentSearch.type && currentSearch.query;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Alex's Book Finder</h1>
            </header>
            <SearchBar onSearch={handleSearch} />
            <main className="App-main">
                {/* Conditionally render search results or featured section */}
                {showSearchResults ? (
                    <>
                        {loading && <LoadingSpinner />}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error && <BookList books={books} />}
                    </>
                ) : (
                    <FeaturedBooks books={featuredBooks} loading={featuredLoading} error={featuredError} />
                )}
            </main>
        </div>
    );
}

export default App;