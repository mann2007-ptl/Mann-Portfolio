import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import VanillaTilt from 'vanilla-tilt';

import './Projects.css';
import jioHotstarImg from '../../assets/jio-hotstar.png';
import ultimateEarsImg from '../../assets/ultimate-ears.png';
import kiranaSetuImg from '../../assets/kiranaSetu.png';
import salomonImg from '../../assets/salomon.png';
import lacosteImg from '../../assets/lacoste.png';
import stanleyImg from '../../assets/stanley.png';
import figmaCgImg from '../../assets/figma-design-cg-clone.jpg';
import figmaEpicImg from '../../assets/figma-design-epic-hospital.jpg';
import githubAnalyzerImg from '../../assets/github-analyzer.png';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
    {
        title: 'JioHotstar Clone',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A pixel-perfect, responsive clone of the popular streaming platform JioHotstar with interactive media carousels and smooth UX.',
        image: jioHotstarImg,
        github: 'https://github.com/mann2007-ptl/JioHotstar-clone',
        live: 'https://mannpatel-jiohotstar-clone.netlify.app/'
    },
    {
        title: 'Ultimate Ears Web Design',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'An immersive product showcase website for Ultimate Ears with high-contrast visuals, dynamic product highlights, and slick animations.',
        image: ultimateEarsImg,
        github: 'https://github.com/mann2007-ptl/ultimateEars',
        live: 'https://mannpatel-ultimate-ears.netlify.app/'
    },
    {
        title: 'KiranaSetu',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A platform designed to empower local Kirana stores by digitizing inventory, ordering, and neighborhood delivery management.',
        image: kiranaSetuImg,
        github: 'https://github.com/mann2007-ptl/KiranaSetu',
        live: 'https://kirana-setu.netlify.app/'
    },
    {
        title: 'Salomon E-Commerce',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A sleek e-commerce store concept inspired by Salomon outdoor footwear, featuring refined typography and smooth interactions.',
        image: salomonImg,
        github: 'https://github.com/mann2007-ptl/salomon-web-clone',
        live: 'https://mannpatel-salomon.netlify.app/'
    },
    {
        title: 'Lacoste Brand Showcase',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A luxury brand landing page for Lacoste emphasizing minimal design, elegant grid spacing, and interactive hero media.',
        image: lacosteImg,
        github: 'https://github.com/mann2007-ptl/lacoste-web-clone',
        live: 'https://mannpatel-lacoste.netlify.app/'
    },
    {
        title: 'Stanley Brand Store',
        category: 'Web Development',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A dynamic online store for Stanley drinkware featuring rich product cards and smooth hover effects.',
        image: stanleyImg,
        github: 'https://github.com/mann2007-ptl/stanley1913-clone',
        live: 'https://mannpatel-stanley.netlify.app/'
    },
    {
        title: 'GitHub Analyzer',
        category: 'Web Development',
        tech: ['React.js', 'GitHub API', 'Chart.js'],
        description: 'A developer dashboard that fetches GitHub user data, visualizes repository metrics, commit velocity, and language distribution.',
        image: githubAnalyzerImg,
        github: 'https://github.com/mann2007-ptl/Github-Analyzer',
        live: 'https://mannpatel-github-analyzer.netlify.app/'
    },
    {
        title: 'CodingGita Clone UI',
        category: 'UI/UX Design',
        tech: ['Figma', 'UI Design', 'Prototyping'],
        description: 'A high-fidelity Figma redesign for CodingGita platform focusing on clean hierarchy, modern dark mode aesthetic, and seamless UX.',
        image: figmaCgImg,
        github: '#',
        live: 'https://www.figma.com/design/Pz7nQd2tYfJ1mX8k/CodingGita-Clone?node-id=0-1&t=abcdef'
    },
    {
        title: 'Epic Hospital Dashboard UI',
        category: 'UI/UX Design',
        tech: ['Figma', 'UX Research', 'Design System'],
        description: 'A comprehensive healthcare management dashboard design created in Figma, optimizing patient records and doctor schedules.',
        image: figmaEpicImg,
        github: '#',
        live: 'https://www.figma.com/design/Xy8mNk3pQw9vL4z2/Epic-Hospital-Dashboard?node-id=0-1&t=abcdef'
    }
];

const Projects = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = activeFilter === 'All'
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-deck-card');
            
            gsap.fromTo(cards,
                { y: 60, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%'
                    },
                    onComplete: () => {
                        cards.forEach(card => {
                            VanillaTilt.init(card, {
                                max: 6,
                                speed: 500,
                                glare: true,
                                'max-glare': 0.15,
                                perspective: 1200
                            });
                        });
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [activeFilter]);

    return (
        <section id="projects" className="projects-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">03. Showcase</span>
                    <h2 className="section-title">
                        Featured <span className="accent">Exhibition</span>
                    </h2>
                </div>

                <div className="project-filters">
                    {['All', 'Web Development', 'UI/UX Design'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="projects-deck-container" ref={gridRef}>
                    {filteredProjects.map((project, idx) => (
                        <div className="project-deck-card" key={project.title}>
                            <div className="project-deck-image-side">
                                <img src={project.image} alt={project.title} className="project-deck-img" loading="lazy" />
                                <div className="project-deck-overlay"></div>
                                <span className="project-index-badge">0{idx + 1}</span>
                            </div>

                            <div className="project-deck-info-side">
                                <div className="project-deck-category">
                                    <FiFolder className="category-icon" /> {project.category}
                                </div>
                                <h3 className="project-deck-title">{project.title}</h3>
                                <p className="project-deck-desc">{project.description}</p>
                                
                                <div className="project-deck-tech-tags">
                                    {project.tech.map(t => (
                                        <span key={t} className="tech-chip">{t}</span>
                                    ))}
                                </div>

                                <div className="project-deck-actions">
                                    {project.github !== '#' && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="deck-btn deck-btn-ghost">
                                            <FiGithub /> Code
                                        </a>
                                    )}
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="deck-btn deck-btn-gold">
                                        <FiExternalLink /> View Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
