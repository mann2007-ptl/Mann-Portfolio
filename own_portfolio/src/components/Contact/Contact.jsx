import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaPaperPlane, FaArrowUp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import Contact3D from './Contact3D';
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
                alert(result.message || "Something went wrong. Please check if you have verified your email with FormSubmit.");
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
            gsap.fromTo('.contact-header-anim',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: "play none none reverse" } }
            );

            gsap.fromTo('.contact-left-col',
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-layout', start: 'top 80%', toggleActions: "play none none reverse" } }
            );

            gsap.fromTo('.contact-form-glass',
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-layout', start: 'top 80%', toggleActions: "play none none reverse" } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="contact-section section" ref={sectionRef}>
            <Contact3D />



            <div className="container contact-container">
                <div className="section-header center mb-16">
                    <ScrollReveal type="heading" stagger={0.1}>
                        <span className="section-label neon-text-purple inline-block mb-4">Transmission</span>
                        <h2 className="section-title contact-main-title">
                            Initiate <span className="gradient-text italic">Contact</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="contact-layout">
                    <div className="contact-left-col">
                        <ScrollReveal type="heading" stagger={0.1}>
                            <h3 className="contact-left-title">Ready to Build the Future?</h3>
                        </ScrollReveal>
                        <ScrollReveal type="paragraph" className="contact-left-desc" stagger={0.02}>
                            I'm actively seeking internships and junior developer roles. Whether you have a visionary project or just want to connect with a fellow engineer, my inbox is always open.
                        </ScrollReveal>

                        <a href="mailto:patelmann673@gmail.com" className="contact-email-link glass-panel">
                            <FaEnvelope className="email-icon" />
                            <span className="email-text">patelmann673@gmail.com</span>
                        </a>

                        <div className="contact-social-row">
                            {socialLinks.map((link, i) => (
                                <Magnetic key={i} strength={30}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="contact-social-icon magnetic-wrap glass-panel" aria-label={link.label}>
                                        {link.icon}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form-glass glass-panel" onSubmit={handleSubmit}>
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="contact-form-grid">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label label-cyan">Identity</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required className="neon-input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label label-purple">Comlink (Email)</label>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required className="neon-input" />
                            </div>
                        </div>

                        <div className="form-group msg-group">
                            <label htmlFor="message" className="form-label label-white">Transmission Data</label>
                            <textarea id="message" name="message" rows="5" placeholder="Project details or message..." required className="neon-input"></textarea>
                        </div>

                        <Magnetic strength={20}>
                            <button type="submit" className="contact-submit-btn magnetic-wrap" disabled={isSubmitting}>
                                <span>{isSubmitting ? 'Transmitting...' : 'Send Transmission'}</span>
                                <FaPaperPlane />
                            </button>
                        </Magnetic>
                    </form>
                </div>

                {/* Footer */}
                <div className="contact-footer">
                    <div className="footer-left">
                        <span className="footer-name">Mann Patel</span>
                        <span className="footer-role">UX Engineer</span>
                    </div>
                    <p className="footer-center">
                        &copy; {new Date().getFullYear()} Mann Patel. Engineered with React, GSAP & Three.js.
                    </p>
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
                    Message sent successfully!
                </div>,
                document.body
            )}
        </section>
    );
};

export default Contact;
