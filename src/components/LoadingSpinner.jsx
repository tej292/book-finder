// src/components/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner() {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <p>Loading books...</p>
        </div>
    );
}

export default LoadingSpinner;