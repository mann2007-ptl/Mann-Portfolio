import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import HeroImg from '../../assets/photo.jpeg';
import './Hero.css';

const Typewriter = ({ texts, speed = 150, deleteSpeed = 100, delay = 2000 }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const currentFullText = texts[textIndex];

        const handleTyping = () => {
            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentFullText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                if (charIndex < currentFullText.length) {
                    setDisplayedText(currentFullText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, texts, textIndex, speed, deleteSpeed, delay]);

    return <span>{displayedText}<span className="cursor">|</span></span>;
};

const Hero = () => {
    return (
        <section id="hero" className="hero-section section">
            {/* Animated Background Blobs */}
            <div className="hero-blob blob-1"></div>
            <div className="hero-blob blob-2"></div>

            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >


                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Hi, I'm <span className="accent-text">Mann Patel</span>
                        <br />
                        <span className="typewriter-text">
                            <Typewriter
                                texts={["Full-Stack Developer", "UI/UX Designer", "Creative Coder"]}
                                speed={100}
                                delay={2500}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        I build pixel-perfect, engaging, and accessible digital experiences. Passionate about merging design with robust engineering.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-outline">Let's Talk</a>
                    </motion.div>

                    <motion.div
                        className="hero-socials"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <a href="https://github.com/mann2007-ptl" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/mann-patel-839b33399" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
                        <a href="https://www.youtube.com/@patelmann7197" target="_blank" rel="noopener noreferrer" className="social-link"><FaYoutube /></a>
                        <a href="https://leetcode.com/u/Mann2006/" target="_blank" rel="noopener noreferrer" className="social-link"><SiLeetcode /></a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="hero-img-wrapper">
                        <img src={HeroImg} alt="Mann Patel" className="hero-img" />
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default Hero;
