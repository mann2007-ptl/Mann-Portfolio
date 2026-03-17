import React from 'react';
import './Background.css';

const Background = () => {
    return (
        <div className="bg-grid-overlay" aria-hidden="true">
            <div className="bg-gradient-1"></div>
            <div className="bg-gradient-2"></div>
        </div>
    );
};

export default Background;
