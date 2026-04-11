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
        const entryTween = gsap.fromTo(content,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Parallax Effect — scrub: 1.5 for damped, buttery movement (not raw scrub: true)
        const parallaxTween = gsap.to(content, {
            y: () => -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            // Kill only THIS instance's triggers, not all global ones
            entryTween.scrollTrigger?.kill();
            parallaxTween.scrollTrigger?.kill();
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
