import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import userPhoto from '../../assets/photo.jpeg';
import './About.css';

const BentoCard = ({ children, className = '', delay = 0 }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`bento-card ${className}`}
        >
            <div className="bento-card-inner">
                {children}
            </div>
            {/* The golden tracing border is handled via CSS pseudo-elements */}
        </motion.div>
    );
};

const About = () => {
    const techStack = [
        "React", "Node.js", "Express", "MongoDB", "JavaScript",
        "HTML", "CSS", "Tailwind", "C++", "Git"
    ];

    return (
        <section id="about" className="about-bento-section section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">01. Origin</span>
                    <h2 className="section-title">
                        The <span className="accent">Architect</span>
                    </h2>
                </div>

                <div className="bento-grid">
                    {/* CARD 1: Headshot with glitch */}
                    <BentoCard className="bento-photo" delay={0.1}>
                        <div className="bento-photo-wrapper">
                            <img src={userPhoto} alt="Mann Patel" className="photo-base" loading="lazy" />
                        </div>
                    </BentoCard>

                    {/* CARD 2: Bio Text */}
                    <BentoCard className="bento-bio" delay={0.2}>
                        <h3 className="bento-heading">About Me</h3>
                        <p className="bento-text">
                            I am a Computer Engineering student based in Gujarat, India. 
                            My journey in web development started with a curiosity for how things work on the internet, 
                            which has now grown into a passion for building clean, performant, and interactive websites.
                        </p>
                        <p className="bento-text">
                            I specialize in the MERN stack (MongoDB, Express, React, Node.js) but my true love lies in 
                            frontend engineering—creating intuitive user interfaces that delight users.
                        </p>
                    </BentoCard>

                    {/* CARD 3: Infinite Marquee Tech Stack */}
                    <BentoCard className="bento-tech" delay={0.3}>
                        <div className="bento-tech-content">
                            <h4 className="bento-subheading">Core Arsenal</h4>
                            <div className="tech-marquee-container">
                                <div className="tech-marquee">
                                    {[...techStack, ...techStack].map((tech, i) => (
                                        <span key={i} className="tech-item">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* CARD 4: LeetCode Stats */}
                    <BentoCard className="bento-stats" delay={0.4}>
                        <div className="stat-content">
                            <span className="stat-number">350<span className="stat-plus">+</span></span>
                            <span className="stat-label">LeetCode Solved</span>
                            <div className="stat-bar-container">
                                <div className="stat-bar-fill"></div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* CARD 5: Current Focus */}
                    <BentoCard className="bento-focus" delay={0.5}>
                        <h4 className="bento-subheading">Current Focus</h4>
                        <ul className="focus-list">
                            <li>Full-Stack Web Development</li>
                            <li>UI/UX Design & Prototyping</li>
                            <li>Data Structures & Algorithms</li>
                        </ul>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export default About;
