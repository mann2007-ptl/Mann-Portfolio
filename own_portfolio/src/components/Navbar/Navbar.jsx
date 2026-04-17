import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from '../Magnetic/Magnetic';
import Logo from './Logo';
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
            <div className="nav-container">
                <Magnetic strength={10}>
                    <Link to="/" className="nav-logo magnetic-wrap">
                        <Logo />
                        <span className="nav-logo-text">MANN</span>
                    </Link>
                </Magnetic>

                <Magnetic strength={20}>
                    <div
                        className={`hamburger magnetic-wrap ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Magnetic>

                {/* Mobile Menu Overlay */}
                <div
                    className={`nav-overlay ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
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


            </div>
        </nav>
    );
};

export default Navbar;

