import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaYoutube, FaBook } from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa6';
import Magnetic from '../Magnetic/Magnetic';
import ultimateEesImg from '../../assets/ultimate-ears.png';
import githubAnalyzerImg from '../../assets/github-analyzer.png';
import salomonImg from '../../assets/salomon.png';
import lacosteImg from '../../assets/lacoste.png';
import stanleyImg from '../../assets/stanley.png';
import jioHotstarImg from '../../assets/jio-hotstar.png';
import figmaCodingGitaImg from '../../assets/figma-design-cg-clone.jpg';
import figmaEpicHospitalImg from '../../assets/figma-design-epic-hospital.jpg';
import KiranaSetu from '../../assets/kiranaSetu.png';
import caiaImg from '../../assets/caia.png';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Full Stack', 'HTML-CSS', 'Figma'];

    const projects = [
        {
            title: 'CAIA — AI System Design',
            description: 'AI-powered system design learning platform with 900+ concepts, RBAC, admin analytics, and 100+ API endpoints.',
            techString: 'REACT • REDUX • NODE • EXPRESS • MONGODB',
            category: 'Full Stack',
            image: caiaImg,
            links: { demo: 'https://caia-system-design.vercel.app/', code: 'https://github.com/mann2007-ptl/caia_system_design_mann_patel', docs: 'https://documenter.getpostman.com/view/50840766/2sBXwmQYQA' }
        },
        {
            title: 'kiranaSetu',
            description: 'MERN app that digitizes local kirana stores with online product browsing, order management, and customer engagement.',
            techString: 'REACT • TAILWIND • NODE • MONGODB',
            category: 'Full Stack',
            image: KiranaSetu,
            links: { demo: 'https://kirana-setu.netlify.app/', code: 'https://github.com/mann2007-ptl/kiranaSetu', youtube: 'https://youtu.be/5tiD33iZs70?si=FDFRdx7IKPOi2eSY' }
        },
        {
            title: 'GitHub Profile Analyzer',
            description: 'Analyze any GitHub profile with premium glassmorphism UI, user stats, top repositories, and language distribution.',
            techString: 'REACT • CSS • GITHUB API',
            category: 'Full Stack',
            image: githubAnalyzerImg,
            links: { demo: 'https://mannpatel-githubanalyser.netlify.app/', code: 'https://github.com/mann2007-ptl/Github-profileAnalyzer', youtube: 'https://youtu.be/tK5DegUFxyo?si=YgiqfyhR4zq69FnM' }
        },
        {
            title: 'Ultimate Ears',
            description: 'High-energy, immersive landing page clone with dynamic scroll interactions and punchy typography.',
            techString: 'HTML • CSS • JAVASCRIPT',
            category: 'HTML-CSS',
            image: ultimateEesImg,
            links: { demo: 'https://mannpatel-ultimate-ears-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/ultimate-ears-diwali-assgn', youtube: 'https://youtu.be/dEqTLWKtaSM?si=VCURJ9gfygrkPbma' }
        },
        {
            title: 'Salomon Clone',
            description: 'Premium outdoor gear store featuring rugged aesthetics, smooth navigation, and responsive product grids.',
            techString: 'HTML • CSS • UI',
            category: 'HTML-CSS',
            image: salomonImg,
            links: { demo: 'https://mannpatel-salomon-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/salomon-diwali-asgn/tree/main/salomon', youtube: 'https://youtu.be/Ogk8143L_HY?si=7Ob175mhoyYdUuP1' }
        },
        {
            title: 'Lacoste Clone',
            description: 'Responsive Lacoste website clone with modern layout techniques, mega-menus, and product filtering.',
            techString: 'HTML • CSS • MEGA-MENU',
            category: 'HTML-CSS',
            image: lacosteImg,
            links: { demo: 'https://mannpatel108585-lacoste-clone.netlify.app/diwali_assgn1/lacoste/', code: 'https://github.com/mann2007-ptl/diwali_assgn1/tree/main/lacoste', youtube: 'https://youtu.be/xAganSw7jdM?si=yVgZU4fMt1sulXBU' }
        },
        {
            title: 'Stanley Clone',
            description: 'Modern product landing page clone with strong visuals and typography focus.',
            techString: 'HTML • CSS • ANIMATIONS',
            category: 'HTML-CSS',
            image: stanleyImg,
            links: { demo: 'https://mannpatel-stanley.netlify.app/stanley-diwal-assgn-/stanley/', code: 'https://github.com/mann2007-ptl/stanley-diwal-assgn-/tree/main/stanley', youtube: 'https://youtu.be/wMEwE0U6ipY?si=KFx2pMu0Vtk-TeUP' }
        },
        {
            title: 'Jio-Hotstar Clone',
            description: 'UI clone inspired by streaming platforms with card layouts, spacing, and content hierarchy.',
            techString: 'HTML • CSS • RESPONSIVE',
            category: 'HTML-CSS',
            image: jioHotstarImg,
            links: { demo: 'https://mannpatel108585-jiohotstar-clone.netlify.app/diwali_assgn/jio-hotstar/', code: 'https://github.com/mann2007-ptl/diwali_assgn/tree/main/jio-hotstar', youtube: 'https://youtu.be/g-J-iG2aoR4?si=zn8WcRV48pUlUvgk' }
        },
        {
            title: 'Epic Hospital',
            description: 'Modern premium Figma UI/UX design for a multispeciality hospital with patient accessibility.',
            techString: 'FIGMA • UI/UX',
            category: 'Figma',
            image: figmaEpicHospitalImg,
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=645-2&t=h5aBYjHjlA8j6WJM-1' }
        },
        {
            title: 'CodingGita',
            description: 'Comprehensive Figma design and prototyping for a full website clone with modern aesthetics.',
            techString: 'FIGMA • PROTOTYPING',
            category: 'Figma',
            image: figmaCodingGitaImg,
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=716-2&t=h5aBYjHjlA8j6WJM-1' }
        }
    ];

    const filteredProjects = projects.filter(project => activeFilter === 'All' || project.category === activeFilter);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.exhibit-card');
            
            gsap.fromTo(cards, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );

            cards.forEach((card) => {
                const img = card.querySelector('.exhibit-img');
                if (img) {
                    gsap.to(img, {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        }
                    });
                }
            });
            
            ScrollTrigger.refresh();
        }, gridRef);

        return () => ctx.revert();
    }, [activeFilter]);

    return (
        <section id="work" className="projects-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">03. Archive</span>
                    <h2 className="section-title">
                        The <span className="accent">Exhibition</span>
                    </h2>
                </div>

                {/* Filter Controls */}
                <div className="project-filters">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="exhibit-grid" ref={gridRef}>
                    {filteredProjects.map((project) => (
                        <div className="exhibit-card" key={project.title}>
                            <div className="exhibit-image-wrap">
                                <img src={project.image} alt={project.title} className="exhibit-img" loading="lazy" />
                                <div className="exhibit-overlay"></div>
                            </div>

                            <div className="exhibit-info">
                                <span className="exhibit-tech">{project.techString}</span>
                                <h3 className="exhibit-title">{project.title}</h3>
                                <p className="exhibit-desc">{project.description}</p>

                                <div className="exhibit-links">
                                    {project.links.demo && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="exhibit-btn">
                                                Live Demo
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.code && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="exhibit-btn-icon">
                                                <FaGithub />
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.youtube && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="exhibit-btn-icon">
                                                <FaYoutube />
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.figma && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.figma} target="_blank" rel="noopener noreferrer" className="exhibit-btn">
                                                <FaFigma style={{ marginRight: '6px' }} /> Figma
                                            </a>
                                        </Magnetic>
                                    )}
                                    {project.links.docs && (
                                        <Magnetic strength={20}>
                                            <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="exhibit-btn-icon">
                                                <FaBook />
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
