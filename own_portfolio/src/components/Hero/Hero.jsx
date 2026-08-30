import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = ({ loading }) => {
    const heroRef = useRef(null);
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);
    const centerNameRef = useRef(null);
    const [animationRan, setAnimationRan] = useState(false);

    useEffect(() => {
        if (loading || animationRan) return;

        // Initial Reveal Animation
        const tl = gsap.timeline();
        tl.fromTo(topTextRef.current,
            { y: '50%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.2, ease: "power3.out" },
            0.2
        )
        .fromTo(bottomTextRef.current,
            { y: '-50%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.2, ease: "power3.out" },
            0.2
        )
        .fromTo('.hero-socials a',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            1.0
        );

        setAnimationRan(true);
    }, [loading, animationRan]);

    useEffect(() => {
        if (!heroRef.current) return;

        // Scroll Split Animation
        const splitTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
            }
        });

        splitTl.to(topTextRef.current, {
            y: '-60vh',
            opacity: 0,
            ease: "none"
        }, 0)
        .to(bottomTextRef.current, {
            y: '60vh',
            opacity: 0,
            ease: "none"
        }, 0)
        .fromTo(centerNameRef.current, 
            { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', ease: "power2.out" }, 
            0.2
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/mann2007-ptl', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mann-patel-839b33399', label: 'LinkedIn' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/@patelmann7197', label: 'YouTube' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Mann2006/', label: 'LeetCode' },
        { icon: <FaXTwitter />, href: 'https://x.com/mann_ptl_20', label: 'Twitter' },
    ];

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            {/* 3D Background */}
            <div className="hero-3d-wrapper">
                <Suspense fallback={null}>
                    <Hero3D />
                </Suspense>
            </div>

            <div className="container hero-container">
                {/* Abstract Typography */}
                <div className="hero-typography">
                    <div className="split-text-container top-text" ref={topTextRef}>
                        <h1>SOFTWARE</h1>
                    </div>
                    
                    <div className="center-reveal-name" ref={centerNameRef}>
                        <h2 className="gradient-text">MANN PATEL</h2>
                        <p className="hero-subtitle">Full-Stack Developer & Performance Engineer</p>
                    </div>

                    <div className="split-text-container bottom-text" ref={bottomTextRef}>
                        <h1>ENGINEER</h1>
                    </div>
                </div>

                <div className="hero-socials">
                    {socialLinks.map((link, i) => (
                        <Magnetic key={i} strength={30}>
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

            <div className="hero-scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
