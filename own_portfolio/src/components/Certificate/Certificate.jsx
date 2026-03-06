import React from 'react';
import { motion } from 'framer-motion';
import cssCertiImg from '../../assets/css-certi.png';
import cCertiImg from '../../assets/c-certifictate.jpg';
import './Certificate.css';

const certificates = [
    {
        id: 1,
        title: "Introduction to C",
        provider: "Sololearn",
        date: "March 06, 2026",
        description: "Completed course demonstrating theoretical and practical understanding of C.",
        image: cCertiImg,
        alt: "Sololearn Introduction to C Certificate"
    },
    {
        id: 2,
        title: "HackerRank CSS (Basic) Certificate",
        provider: "HackerRank",
        date: "Dec 15, 2025",
        description: "Validated expertise in CSS fundamentals including selectors, layout mechanisms (Flexbox, Grid), and responsive design.",
        image: cssCertiImg,
        alt: "HackerRank CSS (Basic) Certificate"
    }
];

const Certificate = () => {
    return (
        <section id="certificate" className="certificate-section section">
            <div className="container">
                <motion.div
                    className="section-header center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-heading">My Achievements</span>
                    <h2 className="section-title">Certifications</h2>
                </motion.div>

                <div className="certificate-content">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            className="certificate-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="certificate-image">
                                <img src={cert.image} alt={cert.alt} />
                            </div>
                            <div className="certificate-info">
                                <h3 className="certificate-title">{cert.title}</h3>
                                <div className="certificate-provider">{cert.provider}</div>
                                <p className="certificate-description">{cert.description}</p>
                                <span className="certificate-date">Earned: {cert.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificate;
