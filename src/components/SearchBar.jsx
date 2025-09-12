// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('title'); // Default search type

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(searchType, query.trim());
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
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
            <input
                type="text"
                placeholder={`Search by ${searchType}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-bar-input"
            />
            <button type="submit" className="search-bar-button">Search</button>
        </form>
    );
}

export default SearchBar;