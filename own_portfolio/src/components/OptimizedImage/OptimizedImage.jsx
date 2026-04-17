import React, { useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

/**
 * OptimizedImage
 * - Zero CLS: Strongly typed aspect ratio and explicit width/height wrapper.
 * - IntersectionObserver lazy loading natively.
 * - Async decoding so the main thread is never blocked.
 * - Fallback to low-res placeholder if needed (optional via CSS background).
 */
export default function OptimizedImage({
    src,
    alt,
    className = "",
    aspectRatio = "16/9",
    width = "100%",
    height = "auto",
    ...props
}) {
    const imgRef = useRef(null);
    const { isIntersecting } = useIntersectionObserver(imgRef, {
        rootMargin: '200px', // Load images slightly before they become visible
        freezeOnceVisible: true
    });

    return (
        <div
            ref={imgRef}
            className={`optimized-image-wrapper ${className}`}
            style={{
                aspectRatio,
                width,
                height,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.02)', // Skeleton background color
                position: 'relative'
            }}
        >
            {isIntersecting ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 1,
                        transition: 'opacity 0.4s ease-in'
                    }}
                    onLoad={(e) => {
                        e.target.style.opacity = 1;
                    }}
                    {...props}
                />
            ) : null}
        </div>
    );
}
