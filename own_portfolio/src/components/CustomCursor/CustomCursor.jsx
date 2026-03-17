import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dot = cursorDotRef.current;
        const outline = cursorOutlineRef.current;

        // Use quickTo for high performance following
        let xToDot = gsap.quickTo(dot, "left", { duration: 0.1, ease: "power2.out" });
        let yToDot = gsap.quickTo(dot, "top", { duration: 0.1, ease: "power2.out" });

        let xToOutline = gsap.quickTo(outline, "left", { duration: 0.4, ease: "power3.out" });
        let yToOutline = gsap.quickTo(outline, "top", { duration: 0.4, ease: "power3.out" });

        const moveCursor = (e) => {
            if (!isVisible) setIsVisible(true);
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToOutline(e.clientX);
            yToOutline(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Add listeners to all clickable elements
        const updateHoverListeners = () => {
            const clickables = document.querySelectorAll('a, button, input, textarea, .magnetic-wrap, select, .skill-chip, .project-card, .footer-brand');

            clickables.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
            return clickables;
        };

        const clickables = updateHoverListeners();

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver(() => {
            updateHoverListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);

            clickables.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            observer.disconnect();
        };
    }, [isVisible]);

    return (
        <>
            <div
                ref={cursorDotRef}
                className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
            />
            <div
                ref={cursorOutlineRef}
                className={`custom-cursor-outline ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
