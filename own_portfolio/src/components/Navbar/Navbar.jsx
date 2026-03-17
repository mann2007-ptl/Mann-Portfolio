import React, { useState, useEffect } from 'react';
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
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#work' },
        { label: 'Certificate', href: '#certificate' },
        { label: 'LeetCode', href: '#leetcode' },
        { label: 'Education', href: '#education' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Magnetic strength={10}>
                    <a href="#" className="nav-logo magnetic-wrap">
                        <Logo />
                        <span className="nav-logo-text">MANN</span>
                    </a>
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
                            <a
                                href={item.href}
                                className="nav-link magnetic-wrap"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </a>
                        </Magnetic>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
