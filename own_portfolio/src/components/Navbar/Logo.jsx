import React from 'react';

const Logo = () => {
    return (
        <img
            src="/logo.png"
            alt="Mann Patel Logo"
            className="nav-logo-svg"
            width="52"
            height="52"
            style={{ objectFit: 'contain', mixBlendMode: 'screen', filter: 'drop-shadow(0px 0px 5px rgba(212,168,67,0.3))' }}
        />
    );
};

export default Logo;
