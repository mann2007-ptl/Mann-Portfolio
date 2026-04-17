import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * High-performance Magnetic Component
 * Optimized to avoid layout thrashing by caching bounding rect on entry.
 */
export default function Magnetic({ children, strength = 40 }) {
    const magnetic = useRef(null);
    const rect = useRef(null);

    useEffect(() => {
        const element = magnetic.current;
        if (!element) return;

        // Use a faster ease and shorter duration for a "snappier" feel without lag
        const xTo = gsap.quickTo(element, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.8, ease: "power3.out" });

        const handleMouseEnter = () => {
            rect.current = element.getBoundingClientRect();
        };

        const handleMouseMove = (e) => {
            if (!rect.current) rect.current = element.getBoundingClientRect();

            const { clientX, clientY } = e;
            const { height, width, left, top } = rect.current;

            // Calculate distance relative to element center
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Apply movement scaled by strength
            xTo(x * (strength / 100));
            yTo(y * (strength / 100));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            rect.current = null;
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={magnetic} style={{ display: 'inline-block', position: 'relative' }}>
            {children}
        </div>
    );
}
