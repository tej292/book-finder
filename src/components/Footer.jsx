import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3> Book Finder</h3>
        <p>Your gateway to discovering timeless stories and hidden gems.</p>

        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="https://mail.google.com">Contact Us</a>
        </div>

        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
           <img src="/twitter.jpeg" alt="Twitter" className="social-icon" />

          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.jpeg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.jpeg" alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}  Book Finder. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

