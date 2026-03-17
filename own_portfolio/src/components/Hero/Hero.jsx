import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import Hero3D from './Hero3D';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const titleLinesRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline();

        // Reveal background 3D scene smoothly
        tl.fromTo('.hero-3d-canvas',
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.inOut" },
            0
        )
            // Reveal badge
            .fromTo('.hero-badge',
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.5)" },
                0.5
            )
            // Staggered massive text reveal
            .fromTo(titleLinesRef.current,
                { y: 150, opacity: 0, rotateX: 45, transformOrigin: "50% 100%" },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.15, ease: "expo.out" },
                0.8
            )
            // Fade up description
            .fromTo('.hero-description',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                1.6
            )
            // Reveal CTA buttons
            .fromTo('.hero-cta a',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
                1.8
            )
            // Drop in social icons
            .fromTo('.social-icon',
                { opacity: 0, scale: 0, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" },
                2.0
            );

        // Subtle floating animation for the whole content block
        gsap.to('.hero-content', {
            y: 15,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/mann2007-ptl', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mann-patel-839b33399', label: 'LinkedIn' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/@patelmann7197', label: 'YouTube' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Mann2006/', label: 'LeetCode' },
    ];

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            <Hero3D />

            <div className="container hero-container">
                <div className="hero-content glass-panel-hero">

                    <div className="hero-badge">
                        <span className="badge-dot pulse"></span>
                        <span>Available for opportunities</span>
                    </div>

                    <div className="hero-title-wrapper">
                        <div className="title-overflow-hidden">
                            <h1 className="hero-title" ref={el => titleLinesRef.current[0] = el}>
                                CREATIVE
                            </h1>
                        </div>
                        <div className="title-overflow-hidden">
                            <h1 className="hero-title" ref={el => titleLinesRef.current[1] = el}>
                                <span className="gradient-text">DEVELOPER.</span>
                            </h1>
                        </div>
                    </div>

                    <div className="hero-bottom-area">
                        <p className="hero-description">
                            I'm <span className="neon-text-cyan font-bold">Mann Patel</span>. Architecting digital experiences that push the boundaries of web engineering and cinematic design.
                        </p>

                        <div className="hero-cta">
                            <Magnetic strength={30}>
                                <a href="#work" className="btn-primary magnetic-wrap">
                                    <span>Explore Work</span>
                                </a>
                            </Magnetic>
                            <Magnetic strength={20}>
                                <a href="#contact" className="btn-outline magnetic-wrap">
                                    <span>Let's Talk</span>
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
