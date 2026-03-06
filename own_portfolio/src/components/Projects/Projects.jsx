import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ultimateEarsImg from '../../assets/ultimate-ears.png';
import salomonImg from '../../assets/salomon.png';
import lacosteImg from '../../assets/lacoste.png';
import stanleyImg from '../../assets/stanley.png';
import jioHotstarImg from '../../assets/jio-hotstar.png';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'Ultimate Ears',
            category: 'Audio Brand Site',
            description: 'A high-energy, visually immersive landing page for Ultimate Ears, featuring dynamic scroll interactions and punchy typography.',
            image: ultimateEarsImg,
            tags: ['HTML', 'CSS'],
            links: {
                demo: 'https://mannpatel-ultimate-ears-clone.netlify.app/',
                code: 'https://github.com/mann2007-ptl/ultimate-ears-diwali-assgn'
            }
        },
        {
            title: 'Salomon',
            category: 'E-Commerce / Outdoor',
            description: 'A premium outdoor gear store clone featuring rugged aesthetics, smooth navigation, and responsive product grids.',
            image: salomonImg,
            tags: ['HTML', 'CSS'],
            links: {
                demo: 'https://mannpatel-salomon-clone.netlify.app/',
                code: 'https://github.com/mann2007-ptl/salomon-diwali-asgn/tree/main/salomon'
            }
        },
        {
            title: 'Lacoste Clone',
            category: 'E-commerce',
            description: 'A responsive clone of the Lacoste website featuring modern layout techniques, mega-menus, and product filtering.',
            image: lacosteImg,
            tags: ['HTML', 'CSS'],
            links: {
                demo: 'https://mannpatel108585-lacoste-clone.netlify.app/diwali_assgn1/lacoste/',
                code: 'https://github.com/mann2007-ptl/diwali_assgn1/tree/main/lacoste'
            }
        },
        {
            title: 'Stanley Product Page',
            category: 'Landing Page',
            description: 'Modern product landing page clone with strong visuals, typography focus, and completely responsive sections.',
            image: stanleyImg,
            tags: ['HTML', 'CSS'],
            links: {
                demo: 'https://mannpatel-stanley.netlify.app/stanley-diwal-assgn-/stanley/',
                code: 'https://github.com/mann2007-ptl/stanley-diwal-assgn-/tree/main/stanley'
            }
        },
        {
            title: 'Jio-Hotstar Clone',
            category: 'Streaming UI',
            description: 'UI clone inspired by streaming platforms to practice card layouts, spacing, and content hierarchy.',
            image: jioHotstarImg,
            tags: ['HTML', 'CSS'],
            links: {
                demo: 'https://mannpatel108585-jiohotstar-clone.netlify.app/diwali_assgn/jio-hotstar/',
                code: 'https://github.com/mann2007-ptl/diwali_assgn/tree/main/jio-hotstar'
            }
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <motion.div
                    className="section-header center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-heading">My Portfolio</span>
                    <h2 className="section-title">Featured Projects</h2>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} className="project-card" variants={item}>
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a href={project.links.demo} className="btn-icon" aria-label="Demo"><FaExternalLinkAlt /></a>
                                        <a href={project.links.code} className="btn-icon" aria-label="Code"><FaGithub /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
