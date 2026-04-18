import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import './Hero.css';

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = ({ loading }) => {
    const heroRef = useRef(null);
    const [animationRan, setAnimationRan] = useState(false);

    useEffect(() => {
        if (loading || animationRan) return;

        const rafId = requestAnimationFrame(() => {
            gsap.context(() => {
                const tl = gsap.timeline();

                tl.from('.hero-label',
                    { y: -15, opacity: 0, duration: 0.8, ease: "back.out(1.5)" },
                    0.2
                )
                    .from('.hero-bottom-area',
                        { y: 25, opacity: 0, duration: 0.9, ease: "power3.out" },
                        0.4
                    )
                    .from('.hero-3d-wrapper',
                        { opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" },
                        0.3
                    )
                    .from('.hero-socials a',
                        { y: 15, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
                        0.6
                    )
                    .from('.hero-scroll-cue',
                        { opacity: 0, duration: 0.6, ease: "power2.out" },
                        1.0
                    );
            }, heroRef);

            setAnimationRan(true);
        });

        return () => cancelAnimationFrame(rafId);
    }, [loading, animationRan]);

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/mann2007-ptl', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mann-patel-839b33399', label: 'LinkedIn' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/@patelmann7197', label: 'YouTube' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Mann2006/', label: 'LeetCode' },
        { icon: <FaXTwitter />, href: 'https://x.com/mann_ptl_20', label: 'Twitter' },
    ];

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            <div className="hero-ambient-glow"></div>
            <div className="hero-grain"></div>

            <div className="container hero-container">
                {/* LEFT: Main content */}
                <div className="hero-left">
                    <span className="hero-label">Mann Patel</span>

                    <h1 className="hero-headline">
                        I build <em>digital</em><br />
                        experiences that<br />
                        <em>inspire.</em>
                    </h1>

                    <div className="hero-bottom-area">
                        <p className="hero-description">
                            Full-stack developer specializing in cinematic web design,
                            MERN stack, and performance engineering.
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

                {/* RIGHT: 3D Object */}
                <div className="hero-3d-wrapper">
                    <Suspense fallback={null}>
                        <Hero3D />
                    </Suspense>
                </div>
            </div>

            <div className="hero-scroll-cue">
                <div className="scroll-line"></div>
                <span className="scroll-text">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
