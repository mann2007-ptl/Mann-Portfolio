import React from 'react';

const Logo = () => {
    return (
        <svg
            width="36"
            height="32"
            viewBox="0 0 130 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="nav-logo-svg"
        >
            <defs>
                <linearGradient id="neonGradientNav" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="50%" stopColor="#4facfe" />
                    <stop offset="100%" stopColor="#7303c0" />
                </linearGradient>
            </defs>

            {/* "M" Part */}
            <path
                d="M 25 90 V 30 L 55 60 L 85 30 V 90"
                stroke="url(#neonGradientNav)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* "P" Loop Part added to the right leg of M */}
            <path
                d="M 85 30 H 95 C 120 30, 120 65, 95 65 H 85"
                stroke="url(#neonGradientNav)"
                strokeWidth="16"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Logo;
