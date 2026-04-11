import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './Hero.css';

// Simple lightweight particle component
const Particles = () => {
    // Generate an array of 40 ambient dots
    const dotsContent = Array.from({ length: 40 }).map((_, i) => {
        // Random position, size, and animation delay
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1; // 1px to 4px
        const delay = Math.random() * 5;
        const isCyan = Math.random() > 0.5;

        return (
            <div
                key={i}
                className={`ambient-particle ${isCyan ? 'cyan' : 'purple'}`}
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                }}
            />
        );
    });

    return <div className="particles-container">{dotsContent}</div>;
};

// Extremely lightweight CSS parallax starfield
const Starfield = () => {
    return (
        <div className="starfield-wrapper">
            <div className="stars-layer-1"></div>
            <div className="stars-layer-2"></div>
            <div className="stars-layer-3"></div>
        </div>
    );
};

const Hero = ({ loading }) => {
    const heroRef = useRef(null);
    const cardRef = useRef(null);
    const titleLinesRef = useRef([]);

    // Zero-lag mouse tracker for the glass card flashlight effect
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    useEffect(() => {
        if (loading) return; // Allow natural DOM paint behind preloader for LCP, run GSAP after

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo('.hero-glow-core',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
                0
            )
                .fromTo('.cinematic-glass-card',
                    { opacity: 0, y: 60, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" },
                    0
                )
                .fromTo('.hero-badge-pill',
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)" },
                    0.2
                )
                .fromTo(titleLinesRef.current,
                    { y: 120, opacity: 0, rotateX: 20 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" },
                    0.2
                )
                .fromTo('.hero-cta a',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
                    0.6
                )
                .fromTo('.social-icon',
                    { opacity: 0, scale: 0 },
                    { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" },
                    0.8
                );

        }, heroRef);

        return () => ctx.revert();
    }, [loading]);

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/mann2007-ptl', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mann-patel-839b33399', label: 'LinkedIn' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/@patelmann7197', label: 'YouTube' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Mann2006/', label: 'LeetCode' },
        { icon: <FaXTwitter />, href: 'https://x.com/mann_ptl_20', label: 'Twitter' },
    ];

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            <div className="hero-background-gradient"></div>
            <Starfield />
            <Particles />

            <div className="container hero-container">
                <div
                    className="cinematic-glass-card"
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                >
                    <div className="hero-glow-core"></div>

                    <div className="hero-badge-pill">
                        <span className="badge-dot pulse-cyan"></span>
                        <span className="badge-text">AVAILABLE FOR OPPORTUNITIES</span>
                    </div>

                    <div className="hero-title-wrapper">
                        <div className="title-overflow-hidden">
                            <h1 className="hero-title white-text" ref={el => titleLinesRef.current[0] = el}>
                                CREATIVE
                            </h1>
                        </div>
                        <div className="title-overflow-hidden">
                            <h1 className="hero-title highlight-gradient" ref={el => titleLinesRef.current[1] = el}>
                                DEVELOPER.
                            </h1>
                        </div>
                    </div>

                    <div className="hero-bottom-area">
                        <p className="hero-description">
                            I'm Mann Patel. Architecting digital experiences that push the boundaries of web engineering and cinematic design.
                        </p>

                        <div className="hero-cta">
                            <Magnetic strength={30}>
                                <Link to="/projects" className="btn-primary magnetic-wrap">
                                    <span>Explore Work</span>
                                </Link>
                            </Magnetic>
                            <Magnetic strength={20}>
                                <a
                                    href="https://drive.google.com/file/d/1L9B4lu0oojjxq5Fz0qiozFWxS8L_Uzw2/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline magnetic-wrap"
                                >
                                    <span>View Resume</span>
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <div className="hero-socials">
                    {socialLinks.map((link, i) => (
                        <Magnetic key={i} strength={40}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon magnetic-wrap"
                                aria-label={link.label}
                            >
                                {link.icon}
                            </a>
                        </Magnetic>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
