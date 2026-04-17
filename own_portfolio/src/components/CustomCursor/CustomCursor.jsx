import React, { useEffect, useRef, useCallback } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const dotPos = useRef({ x: -100, y: -100 });
    const outlinePos = useRef({ x: -100, y: -100 });
    const rafId = useRef(null);
    const isHovering = useRef(false);
    const isVisible = useRef(false);

    // Early bail for touch/mobile devices — check once on mount
    const isTouch = useRef(
        typeof window === 'undefined' ? true : !window.matchMedia('(pointer: fine)').matches
    );

    const render = useCallback(() => {
        const dot = cursorDotRef.current;
        const outline = cursorOutlineRef.current;
        if (!dot || !outline) return;

        // Ultra-smooth lerp — dot nearly instant, outline trails beautifully
        const dotSpeed = 0.85;
        const outlineSpeed = 0.18;

        dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotSpeed;
        dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotSpeed;

        outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * outlineSpeed;
        outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * outlineSpeed;

        // Use transform instead of top/left — GPU accelerated, zero layout thrash
        dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
        outline.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0) translate(-50%, -50%)`;

        rafId.current = requestAnimationFrame(render);
    }, []);

    useEffect(() => {
        if (isTouch.current) return;

        const dot = cursorDotRef.current;
        const outline = cursorOutlineRef.current;
        if (!dot || !outline) return;

        const moveCursor = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            if (!isVisible.current) {
                isVisible.current = true;
                dot.classList.add('visible');
                outline.classList.add('visible');
            }
        };

        const handleMouseLeave = () => {
            isVisible.current = false;
            dot.classList.remove('visible');
            outline.classList.remove('visible');
        };

        const handleMouseEnter = () => {
            isVisible.current = true;
            dot.classList.add('visible');
            outline.classList.add('visible');
        };

        const handleHoverStart = () => {
            isHovering.current = true;
            dot.classList.add('hovering');
            outline.classList.add('hovering');
        };

        const handleHoverEnd = () => {
            isHovering.current = false;
            dot.classList.remove('hovering');
            outline.classList.remove('hovering');
        };

        // Passive listener for maximum throughput
        window.addEventListener('mousemove', moveCursor, { passive: true });
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Hover listeners for clickable elements
        const addHoverListeners = (elements) => {
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        const clickables = document.querySelectorAll('a, button, input, textarea, .magnetic-wrap, select, .skill-chip, .project-card, .footer-brand');
        addHoverListeners(clickables);

        // MutationObserver for dynamically added elements
        const observer = new MutationObserver(() => {
            const newClickables = document.querySelectorAll('a, button, input, textarea, .magnetic-wrap, select, .skill-chip, .project-card, .footer-brand');
            addHoverListeners(newClickables);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Start the render loop
        rafId.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            observer.disconnect();
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [render]);

    if (isTouch.current) return null;

    return (
        <>
            <div
                ref={cursorDotRef}
                className="custom-cursor-dot"
            />
            <div
                ref={cursorOutlineRef}
                className="custom-cursor-outline"
            />
        </>
    );
};

export default CustomCursor;
