import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PageSection = ({ children, id, className = "" }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        // Space Perspective
        gsap.set(section, {
            perspective: 3000,
            transformStyle: "preserve-3d"
        });

        const isFirst = section.parentElement.firstChild === section;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // "Space Float" transition: Sections move from deep space to past viewer
        tl.fromTo(section,
            {
                z: isFirst ? 0 : -1000,
                opacity: isFirst ? 1 : 0,
                scale: isFirst ? 1 : 0.8,
            },
            {
                z: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.inOut"
            }
        ).to(section,
            {
                z: 1000,
                opacity: 0,
                scale: 1.2,
                ease: "power2.inOut"
            }
        );

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`page-section ${className}`}
            style={{
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform, opacity',
                overflow: 'visible',
                pointerEvents: 'auto'
            }}
        >
            <div style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
        </section>
    );
};

export default PageSection;
