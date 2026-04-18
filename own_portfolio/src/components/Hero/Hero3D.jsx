import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldShape = () => {
    const meshRef = useRef();
    const wireRef = useRef();

    // Gold accent color
    const goldColor = useMemo(() => new THREE.Color('#d4a843'), []);
    const darkGold = useMemo(() => new THREE.Color('#8a6d2b'), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.15;
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
        }
        if (wireRef.current) {
            wireRef.current.rotation.x = t * 0.15;
            wireRef.current.rotation.y = t * 0.2;
            wireRef.current.position.y = Math.sin(t * 0.5) * 0.15;
        }
    });

    return (
        <group>
            {/* Solid inner shape — subtle fill */}
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1.2, 0.35, 128, 16, 2, 3]} />
                <meshStandardMaterial
                    color="#0a0a0f"
                    metalness={0.9}
                    roughness={0.3}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Wireframe overlay — gold accent */}
            <mesh ref={wireRef}>
                <torusKnotGeometry args={[1.2, 0.35, 128, 16, 2, 3]} />
                <meshStandardMaterial
                    color={goldColor}
                    emissive={goldColor}
                    emissiveIntensity={1.8}
                    wireframe
                    transparent
                    opacity={0.9}
                />
            </mesh>
        </group>
    );
};

const FloatingParticles = () => {
    const points = useRef();
    const count = 60;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (points.current) {
            points.current.rotation.y = t * 0.03;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#d4a843"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
};

const Hero3D = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 3, 3]} intensity={2.5} color="#d4a843" distance={15} />
            <pointLight position={[-3, -2, 2]} intensity={0.5} color="#ffffff" distance={10} />
            <GoldShape />
            <FloatingParticles />
            <fog attach="fog" args={['#030305', 4, 10]} />
        </Canvas>
    );
};

export default Hero3D;
