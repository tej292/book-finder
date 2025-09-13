import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> BookVerse</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#categories">Categories</a></li>
        <li><a href="https://openlibrary.org/">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
