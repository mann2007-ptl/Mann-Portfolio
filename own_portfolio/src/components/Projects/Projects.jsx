import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import { isMobileDevice } from '../../hooks/useDeviceDetect';
import { FaGithub, FaArrowRight, FaYoutube } from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa6';
import Magnetic from '../Magnetic/Magnetic';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import ultimateEesImg from '../../assets/ultimate-ears.png';
import githubAnalyzerImg from '../../assets/github-analyzer.png';
import salomonImg from '../../assets/salomon.png';
import lacosteImg from '../../assets/lacoste.png';
import stanleyImg from '../../assets/stanley.png';
import jioHotstarImg from '../../assets/jio-hotstar.png';
import figmaCodingGitaImg from '../../assets/figma-design-cg-clone.jpg';
import figmaEpicHospitalImg from '../../assets/figma-design-epic-hospital.jpg';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const isDesktop = !isMobileDevice();

const TiltProject = ({ children, className = '' }) => {
    const tiltRef = useRef(null);
    useEffect(() => {
        if (!isDesktop) return; // Skip VanillaTilt on mobile
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.1,
                perspective: 1000,
            });
        }
        return () => {
            if (tiltRef.current && tiltRef.current.vanillaTilt) tiltRef.current.vanillaTilt.destroy();
        };
    }, []);
    return (
        <div ref={tiltRef} className={`tilt-project ${className}`} style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const projects = [
        {
            title: 'GitHub Profile Analyzer',
            category: 'Full-Stack',
            description: 'Analyze any GitHub profile with premium glassmorphism UI, displaying user stats, top repositories, and language distribution.',
            image: githubAnalyzerImg,
            tags: ['React', 'CSS', 'GitHub API'],
            links: { demo: 'https://mannpatel-githubanalyser.netlify.app/', code: 'https://github.com/mann2007-ptl/Github-profileAnalyzer', youtube: 'https://youtu.be/tK5DegUFxyo?si=YgiqfyhR4zq69FnM' }
        },
        {
            title: 'Ultimate Ears',
            category: 'Website Clone',
            description: 'High-energy, visually immersive landing page with dynamic scroll interactions and punchy typography.',
            image: ultimateEesImg,
            tags: ['HTML', 'CSS'],
            links: { demo: 'https://mannpatel-ultimate-ears-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/ultimate-ears-diwali-assgn', youtube: 'https://youtu.be/dEqTLWKtaSM?si=VCURJ9gfygrkPbma' }
        },
        {
            title: 'Salomon',
            category: 'Website Clone',
            description: 'Premium outdoor gear store featuring rugged aesthetics, smooth navigation, and responsive product grids.',
            image: salomonImg,
            tags: ['HTML', 'CSS'],
            links: { demo: 'https://mannpatel-salomon-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/salomon-diwali-asgn/tree/main/salomon', youtube: 'https://youtu.be/Ogk8143L_HY?si=7Ob175mhoyYdUuP1' }
        },
        {
            title: 'Lacoste Clone',
            category: 'Website Clone',
            description: 'Responsive Lacoste website clone with modern layout techniques, mega-menus, and product filtering.',
            image: lacosteImg,
            tags: ['HTML', 'CSS'],
            links: { demo: 'https://mannpatel108585-lacoste-clone.netlify.app/diwali_assgn1/lacoste/', code: 'https://github.com/mann2007-ptl/diwali_assgn1/tree/main/lacoste', youtube: 'https://youtu.be/xAganSw7jdM?si=yVgZU4fMt1sulXBU' }
        },
        {
            title: 'Stanley Product Page',
            category: 'Website Clone',
            description: 'Modern product landing page clone with strong visuals and typography focus.',
            image: stanleyImg,
            tags: ['HTML', 'CSS'],
            links: { demo: 'https://mannpatel-stanley.netlify.app/stanley-diwal-assgn-/stanley/', code: 'https://github.com/mann2007-ptl/stanley-diwal-assgn-/tree/main/stanley', youtube: 'https://youtu.be/wMEwE0U6ipY?si=KFx2pMu0Vtk-TeUP' }
        },
        {
            title: 'Jio-Hotstar Clone',
            category: 'Website Clone',
            description: 'UI clone inspired by streaming platforms with card layouts, spacing, and content hierarchy.',
            image: jioHotstarImg,
            tags: ['HTML', 'CSS'],
            links: { demo: 'https://mannpatel108585-jiohotstar-clone.netlify.app/diwali_assgn/jio-hotstar/', code: 'https://github.com/mann2007-ptl/diwali_assgn/tree/main/jio-hotstar', youtube: 'https://youtu.be/g-J-iG2aoR4?si=zn8WcRV48pUlUvgk' }
        },
        {
            title: 'CodingGita Website Clone',
            category: 'Figma',
            description: 'Comprehensive Figma design and prototyping for a full website clone of CodingGita, capturing modern aesthetics and responsive layout flows.',
            image: figmaCodingGitaImg,
            tags: ['Figma', 'UI Design'],
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=716-2&t=h5aBYjHjlA8j6WJM-1' }
        },
        {
            title: 'Epic Multispeciality Hospital',
            category: 'Figma',
            description: 'A modern, premium UI/UX design for a multispeciality hospital, focusing on patient accessibility, elegant layout, and clear information hierarchy.',
            image: figmaEpicHospitalImg,
            tags: ['Figma', 'UI/UX Design', 'Healthcare'],
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=645-2&t=h5aBYjHjlA8j6WJM-1' }
        }
    ];

    const categories = ['All', 'Website Clone', 'Full-Stack', 'Figma'];
    const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.projects-header-anim',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: "play none none reverse" } }
            );

            const projectCards = gsap.utils.toArray('.unreal-project-card');
            projectCards.forEach((card) => {
                gsap.fromTo(card,
                    { y: 80, opacity: 0, scale: 0.98, rotationX: 5 },
                    { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: "play none none reverse" } }
                );

                const img = card.querySelector('img');
                if (img) {
                    gsap.to(img, {
                        yPercent: 15, scale: 1.1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 }
                    });
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <section id="work" className="projects-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center mb-20 projects-header-wrapper">
                    <ScrollReveal type="heading" stagger={0.2}>
                        <span className="section-label neon-text-cyan inline-block mb-4">Selected Work</span>
                        <h2 className="section-title proj-main-title">
                            My Creative <span className="accent">Universe</span>
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="projects-filter projects-header-anim">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="projects-list">
                    {filteredProjects.map((project, i) => (
                        <div key={i} className={`unreal-project-card ${i % 2 !== 0 ? 'reverse' : ''}`}>
                            <TiltProject className="project-image-side glass-panel">
                                <div className="project-image-container">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                </div>
                            </TiltProject>

                            <div className="project-details-side">
                                <span className="project-category neon-text-purple">{project.category}</span>
                                <h3 className="project-name">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="tech-stack-tags">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="tech-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-ctas">
                                    {project.links.demo && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary-glow">
                                                Live Demo
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.figma && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.figma} target="_blank" rel="noopener noreferrer" className="btn-primary-glow">
                                                <FaFigma style={{ marginRight: '6px' }} /> Figma
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.code && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="btn-outline-glow">
                                                <FaGithub /> Source
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.youtube && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline-glow">
                                                <FaYoutube style={{ color: '#ff0000', fontSize: '1.2em' }} /> Video
                                            </a>
                                        </Magnetic>
                                    )}
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
