import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaPaperPlane, FaArrowUp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("https://formsubmit.co/ajax/patelmann673@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.success === "true" || result.success === true) {
                setShowSuccess(true);
                e.target.reset();
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                alert(result.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Form error:", error);
            alert("Error sending email. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/mann2007-ptl', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mann-patel-839b33399', label: 'LinkedIn' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/@patelmann7197', label: 'YouTube' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Mann2006/', label: 'LeetCode' },
        { icon: <FaXTwitter />, href: 'https://x.com/mann_ptl_20', label: 'Twitter' },
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.contact-title-anim',
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: 'power3.out',
                    scrollTrigger: { 
                        trigger: sectionRef.current, 
                        start: 'top 80%', 
                        toggleActions: "play none none reverse" 
                    }
                }
            );

            gsap.fromTo('.gold-form',
                { opacity: 0, y: 50, scale: 0.98 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 1.2, 
                    delay: 0.2,
                    ease: 'expo.out', 
                    scrollTrigger: { 
                        trigger: '.contact-layout', 
                        start: 'top 80%', 
                        toggleActions: "play none none reverse" 
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="contact-section section" ref={sectionRef}>
            <div className="container contact-container">
                <div className="section-header center contact-title-anim">
                    <span className="section-label">05. Communication</span>
                    <h2 className="section-title">
                        The Final <span className="accent">Transmission</span>
                    </h2>
                </div>

                <div className="contact-layout">
                    <div className="terminal-info">
                        <div className="terminal-header">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                        <div className="terminal-body">
                            <p><span className="cmd">root@mann-patel:~$</span> ./initiate_contact.sh</p>
                            <p className="response">&gt; System online. Ready to build the future.</p>
                            <p className="response">&gt; Actively seeking visionary projects and opportunities.</p>
                            <br />
                            <p><span className="cmd">root@mann-patel:~$</span> locate transmission-channels</p>
                            
                            <a href="mailto:patelmann673@gmail.com" className="terminal-email">
                                [EMAIL_OVERRIDE]: patelmann673@gmail.com
                            </a>

                            <div className="terminal-socials">
                                {socialLinks.map((link, i) => (
                                    <Magnetic key={i} strength={30}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="terminal-social-icon magnetic-wrap" aria-label={link.label}>
                                            {link.icon}
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="gold-form" onSubmit={handleSubmit}>
                        <div className="gold-form-inner">
                            <input type="hidden" name="_captcha" value="false" />

                            <div className="gold-input-group">
                                <input type="text" id="name" name="name" placeholder=" " required className="gold-input" />
                                <label htmlFor="name" className="gold-label">Entity Name</label>
                            </div>
                            
                            <div className="gold-input-group">
                                <input type="email" id="email" name="email" placeholder=" " required className="gold-input" />
                                <label htmlFor="email" className="gold-label">Comlink (Email)</label>
                            </div>

                            <div className="gold-input-group">
                                <textarea id="message" name="message" rows="4" placeholder=" " required className="gold-input"></textarea>
                                <label htmlFor="message" className="gold-label">Transmission Data</label>
                            </div>

                            <Magnetic strength={20}>
                                <button type="submit" className="gold-submit-btn magnetic-wrap" disabled={isSubmitting}>
                                    <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}</span>
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </div>

                <div className="contact-footer">
                    <p className="footer-text">INITIATED BY MANN PATEL • &copy; {new Date().getFullYear()}</p>
                    <Magnetic strength={40}>
                        <button className="footer-up-btn magnetic-wrap" onClick={scrollToTop} aria-label="Back to top">
                            <FaArrowUp />
                        </button>
                    </Magnetic>
                </div>
            </div>

            {showSuccess && createPortal(
                <div className="success-toast">
                    <span className="success-check">✓</span>
                    Transmission Successful.
                </div>,
                document.body
            )}
        </section>
    );
};

export default Contact;
