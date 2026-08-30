import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
    const pointsRef = useRef();
    
    // Create a dense cloud of tiny gold particles
    const count = 4000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread across a wide, deep area
            pos[i * 3] = (Math.random() - 0.5) * 25; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouseX = state.mouse.x * 0.3;
        const mouseY = state.mouse.y * 0.3;

        if (pointsRef.current) {
            // Gentle continuous rotation combined with mouse tracking
            pointsRef.current.rotation.y = t * 0.03 + mouseX;
            pointsRef.current.rotation.x = t * 0.02 - mouseY;
            // Subtle vertical wave
            pointsRef.current.position.y = Math.sin(t * 0.3) * 0.5;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                color="#D4AF37"
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const Hero3D = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <ParticleField />
            {/* Fog fades particles off smoothly in the distance */}
            <fog attach="fog" args={['#020202', 3, 12]} />
        </Canvas>
    );
};

export default Hero3D;
