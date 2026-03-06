import React, { useState } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { title: 'About', href: '#about' },
        { title: 'Skills', href: '#skills' },
        { title: 'Projects', href: '#projects' },
        { title: 'Certificate', href: '#certificate' },
        { title: 'Education', href: '#education' },
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#" className="logo">
                    Mann<span className="accent"></span>
                </a>

                <div className="nav-controls">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>

                    <div className="mobile-icon" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            <a href={link.href} className="nav-link" onClick={() => setIsOpen(false)}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
