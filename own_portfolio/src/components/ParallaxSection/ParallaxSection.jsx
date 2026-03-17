import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        // Entry Animation: Fade up when section enters viewport
        gsap.fromTo(content,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Parallax Effect: Scrub vertical movement based on scroll speed
        gsap.to(content, {
            y: () => -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [speed]);

    return (
        <section
            ref={sectionRef}
            className={`parallax-wrapper ${className}`}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            <div ref={contentRef} style={{ willChange: 'transform' }}>
                {children}
            </div>
        </section>
    );
};

export default ParallaxSection;
