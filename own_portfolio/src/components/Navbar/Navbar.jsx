import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from '../Magnetic/Magnetic';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const navItems = [
        { label: 'About', to: '/about' },
        { label: 'Skills', to: '/skills' },
        { label: 'Projects', to: '/projects' },
        { label: 'Hackathon', to: '/hackathon' },
        { label: 'Certificate', to: '/certificates' },
        { label: 'LeetCode', to: '/leetcode' },
        { label: 'Education', to: '/education' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-capsule">
                <Magnetic strength={10}>
                    <Link to="/" className="nav-logo magnetic-wrap">
                        <span className="nav-logo-icon">M</span>
                        <span className="nav-logo-text">PATEL</span>
                    </Link>
                </Magnetic>

                <div className="nav-links desktop-only">
                    {navItems.map((item) => (
                        <Magnetic key={item.label} strength={15}>
                            <Link
                                to={item.to}
                                className="nav-link magnetic-wrap"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </Link>
                        </Magnetic>
                    ))}
                </div>

                <Magnetic strength={20}>
                    <button
                        className={`hamburger magnetic-wrap ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span></span>
                        <span></span>
                    </button>
                </Magnetic>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`nav-overlay ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            {/* Mobile Navigation Panel */}
            <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-header">
                    <span className="mobile-nav-title">NAVIGATION</span>
                </div>
                <div className="mobile-nav-links">
                    {navItems.map((item, index) => (
                        <div className="mobile-nav-item-wrapper" key={item.label} style={{ transitionDelay: `${index * 0.05}s` }}>
                            <Link
                                to={item.to}
                                className="mobile-nav-link"
                                onClick={handleLinkClick}
                            >
                                <span className="mobile-nav-num">0{index + 1}</span>
                                <span className="mobile-nav-label">{item.label}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
