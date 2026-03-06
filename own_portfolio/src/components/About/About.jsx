import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-heading">Introduction</span>
                    <h2 className="section-title">About Me</h2>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="about-bio">
                            I am a <strong>Computer Engineering student</strong> based in Gujarat, India.
                            My journey in web development started with a curiosity for how things work on the internet,
                            which has now grown into a passion for building clean, performant, and interactive websites.
                        </p>
                        <p className="about-bio">
                            I specialize in the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js) but my true love lies in
                            frontend engineering—creating intuitive user interfaces that delight users.
                        </p>

                        <div className="stats-container">
                            <div className="stat-item">
                                <span className="stat-number">05+</span>
                                <span className="stat-label">Projects Completed</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">01+</span>
                                <span className="stat-label">Years Coding</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-cards"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="service-card">
                            <h3>Web Development</h3>
                            <p>Building responsive websites that work seamlessly across all devices using modern technologies.</p>
                        </div>
                        <div className="service-card">
                            <h3>UI/UX Design</h3>
                            <p>Translating requirements into clean, user-friendly designs with a focus on usability.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
