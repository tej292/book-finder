import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(searchType, query.trim());
            setSuggestions([]);
            setShowSuggestions(false);
            setHasSearched(true);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
        setHasSearched(true);
        onSearch(searchType, suggestion);
    };

    useEffect(() => {
        if (hasSearched || query.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(
                    `https://openlibrary.org/search.json?${searchType}=${query.trim()}&limit=5`
                );
                const data = await response.json();
                const titles = data.docs.map((doc) => doc.title).slice(0, 5);
                setSuggestions(titles);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [query, searchType, hasSearched]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.search-bar-input-wrapper')) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <form className="search-bar" onSubmit={handleSubmit} autoComplete="off">
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-bar-select"
            >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="subject">Subject</option>
                <option value="isbn">ISBN</option>
                <option value="publisher">Publisher</option>
                <option value="first_publish_year">Year Published</option>
            </select>

            <div className="search-bar-input-wrapper" style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}...`}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setHasSearched(false);
                    }}
                    className="search-bar-input"
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button type="submit" className="search-bar-button">Search</button>
        </form>
    );
}

export default SearchBar;
