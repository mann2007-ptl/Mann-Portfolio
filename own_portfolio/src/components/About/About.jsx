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
                            Computer Engineering student (3rd Semester) specializing in the MERN stack, React Native, and Next.js. I build full-stack, production-style web applications with strong fundamentals in Data Structures & Algorithms and Database Management Systems (MySQL), backed by real hackathon experience and a track record of shipping working products under tight deadlines.
                        </p>
                    </BentoCard>
                    
                    {/* CARD 3: Current Focus (Moved below Bio) */}
                    <BentoCard className="bento-focus" delay={0.3}>
                        <h4 className="bento-subheading">Current Focus</h4>
                        <ul className="focus-list">
                            <li>Full-Stack Web Development</li>
                            <li>UI/UX Design & Prototyping</li>
                            <li>Data Structures & Algorithms</li>
                        </ul>
                    </BentoCard>

                    {/* CARD 4: Infinite Marquee Tech Stack (Full Width) */}
                    <BentoCard className="bento-tech full-width" delay={0.4}>
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
                </div>
            </div>
        </section>
    );
};

export default About;
