import { useState, useEffect } from 'react';

/**
 * Lightweight device detection hook.
 * Returns { isMobile, isTouch } based on pointer capability and screen width.
 * Used to skip expensive effects (CustomCursor, VanillaTilt, Magnetic) on mobile.
 */
export function useDeviceDetect() {
    const [device, setDevice] = useState(() => {
        if (typeof window === 'undefined') return { isMobile: false, isTouch: false };
        const isTouch = !window.matchMedia('(pointer: fine)').matches;
        const isMobile = isTouch || window.innerWidth < 768;
        return { isMobile, isTouch };
    });

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        const update = () => {
            const isTouch = !mq.matches;
            const isMobile = isTouch || window.innerWidth < 768;
            setDevice({ isMobile, isTouch });
        };

        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return device;
}

/**
 * Static check (no hook needed — for use outside components).
 */
export function isMobileDevice() {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(pointer: fine)').matches || window.innerWidth < 768;
}
