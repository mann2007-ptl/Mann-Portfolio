import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiCalendar, FiMaximize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import VanillaTilt from 'vanilla-tilt';
import { isMobileDevice } from '../../hooks/useDeviceDetect';

import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './Hackathon.css';

gsap.registerPlugin(ScrollTrigger);
const isDesktop = !isMobileDevice();

const Hackathon = () => {
    const sectionRef = useRef(null);
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        images: [],
        index: 0
    });

    const hackathons = useMemo(() => [
        {
            id: 1,
            eventTitle: "Electrosphere 2026",
            category: "Tech Fest",
            year: "2026",
            summary: "A high-stakes technical competition focusing on innovative engineering solutions and creative problem-solving.",
            projectName: "Kalix AI",
            projectDescription: "Kalix AI features a clean chat interface with multi-chat support, image generation, voice interaction, and efficient local data management.",
            tags: ["HTML", "CSS", "JS"],
            github: "https://github.com/Dev1822/Kalix",
            live: "https://kalix-syntax-squad.vercel.app/",
            certificate: "/kalixAI/swaminarayan-uni-certi.jpeg",
            gallery: [
                "/kalixAI/kalix1.jpeg",
                "/kalixAI/kalix2.jpeg",
                "/kalixAI/kalix4.jpeg",
                "/kalixAI/kalix5.jpeg"
            ]
        }
    ], []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.section-header center',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%'
                    }
                }
            );

            gsap.fromTo('.hackathon-minimal-row',
                { opacity: 0, scale: 0.98, y: 40 },
                {
                    opacity: 1, scale: 1, y: 0,
                    stagger: 0.3,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%'
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const openModal = useCallback((imgList, startIdx = 0) => {
        setLightbox({
            isOpen: true,
            images: Array.isArray(imgList) ? imgList : [imgList],
            index: startIdx
        });
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setLightbox(prev => ({ ...prev, isOpen: false }));
        document.body.style.overflow = 'auto';
    }, []);

    const nextImage = useCallback(() => {
        setLightbox(prev => ({
            ...prev,
            index: (prev.index + 1) % prev.images.length
        }));
    }, []);

    const prevImage = useCallback(() => {
        setLightbox(prev => ({
            ...prev,
            index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1
        }));
    }, []);

    // AUTO-PLAY FOR LIGHTBOX
    useEffect(() => {
        let timer;
        if (lightbox.isOpen && lightbox.images.length > 1) {
            timer = setInterval(() => {
                nextImage();
            }, 4500);
        }
        return () => clearInterval(timer);
    }, [lightbox.isOpen, lightbox.images.length, nextImage]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightbox.isOpen) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox.isOpen, nextImage, prevImage, closeModal]);

    return (
        <section id="hackathon" className="hackathon-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <ScrollReveal type="heading" stagger={0.1}>
                        <span className="section-label h-label">Competition</span>
                        <h2 className="section-title h-title">
                            My <span className="accent">Hackathon</span> Achievements
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="hackathon-rows-container">
                    {hackathons.map((hack) => (
                        <HackathonRow key={hack.id} data={hack} onOpen={openModal} />
                    ))}
                </div>
            </div>

            {/* INTERACTIVE LIGHTBOX */}
            <AnimatePresence>
                {lightbox.isOpen && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >

                        {lightbox.images.length > 1 && (
                            <>
                                <button className="lb-nav-btn lb-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                                    <FiChevronLeft />
                                </button>
                                <button className="lb-nav-btn lb-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                                    <FiChevronRight />
                                </button>
                            </>
                        )}

                        <motion.div
                            className="lightbox-main-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lb-close-btn" onClick={closeModal} aria-label="Close">
                                <FiX />
                            </button>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={lightbox.index}
                                    src={lightbox.images[lightbox.index]}
                                    className="lightbox-actual-img"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                            {lightbox.images.length > 1 && (
                                <div className="lightbox-image-counter">
                                    {lightbox.index + 1} / {lightbox.images.length}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const HackathonRow = ({ data, onOpen }) => {
    const tRef1 = useRef(null);
    const tRef2 = useRef(null);
    const [sIdx, setSIdx] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setSIdx(p => (p + 1) % data.gallery.length), 4000);
        return () => clearInterval(i);
    }, [data.gallery.length]);

    useEffect(() => {
        if (!isDesktop) return; // Skip on mobile
        if (tRef1.current) VanillaTilt.init(tRef1.current, { max: 8, speed: 400, glare: true, "max-glare": 0.2 });
        if (tRef2.current) VanillaTilt.init(tRef2.current, { max: 5, speed: 400, glare: true, "max-glare": 0.1 });
    }, []);

    return (
        <div className="hackathon-minimal-row">
            <div className="row-media-col certificate-side" onClick={() => onOpen(data.certificate, 0)}>
                <div className="media-book" ref={tRef1}>
                    <img src={data.certificate} alt="Certificate Achievement" loading="lazy" />
                    <div className="media-zoom-overlay"><FiMaximize2 /></div>
                </div>
            </div>

            <div className="row-info-col">
                <div className="row-header-meta">
                    <h3 className="row-hack-name">{data.eventTitle}</h3>
                    <div className="row-hack-year"><FiCalendar /> <span>{data.year}</span></div>
                </div>
                <div className="row-project-content">
                    <h4 className="row-hack-project-title">{data.projectName} <HiOutlineSparkles className="sparkle-icon" /></h4>
                    <p className="row-hack-desc">{data.projectDescription}</p>
                    <div className="row-hack-tags">
                        {data.tags.map(t => <span key={t} className="row-hack-tag">{t}</span>)}
                    </div>
                </div>
                <div className="row-hack-footer">
                    <a href={data.github} target="_blank" rel="noopener noreferrer"><FiGithub /> <span>Source Code</span></a>
                    <a href={data.live} target="_blank" rel="noopener noreferrer"><FiExternalLink /> <span>Live Demo</span></a>
                </div>
            </div>

            <div className="row-media-col gallery-side" onClick={() => onOpen(data.gallery, sIdx)}>
                <div className="media-book-gallery" ref={tRef2}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={sIdx} src={data.gallery[sIdx]}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }} alt="Project Preview"
                        />
                    </AnimatePresence>
                    <div className="media-zoom-overlay"><FiMaximize2 /></div>
                    <div className="row-gallery-dots">
                        {data.gallery.map((_, i) => <div key={i} className={`dot ${i === sIdx ? 'active' : ''}`} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hackathon;
