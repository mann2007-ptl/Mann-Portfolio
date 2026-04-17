import React from 'react';

const Logo = () => {
    return (
        <svg
            width="38"
            height="38"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="nav-logo-svg"
            style={{ filter: 'drop-shadow(0px 0px 8px rgba(212,168,67,0.4))' }}
        >
            <defs>
                <linearGradient id="goldMain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d676" />
                    <stop offset="50%" stopColor="#d4a843" />
                    <stop offset="100%" stopColor="#8a6d2b" />
                </linearGradient>
            </defs>

            <g stroke="url(#goldMain)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                {/* Outer M structure */}
                <path d="M 16 80 L 16 28 L 50 62 L 84 28 L 84 80" />

                {/* Inner architectural V */}
                <path d="M 32 80 L 32 48 L 50 66 L 68 48 L 68 80" />

                {/* Center vertical support */}
                <line x1="50" y1="66" x2="50" y2="80" />
            </g>
        </svg>
    );
};

export default Logo;
