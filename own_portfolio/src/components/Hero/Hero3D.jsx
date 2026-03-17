import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, MeshDistortMaterial, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const ParticleRing = ({ count, color, radius }) => {
    const points = useRef();

    // Generate random points in a ring
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colorArray = new Float32Array(count * 3);
        const rColor = new THREE.Color(color);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 1.5;

            // Add a spherical twist
            const x = Math.cos(angle) * r;
            const y = (Math.random() - 0.5) * 2;
            const z = Math.sin(angle) * r;

            positions.set([x, y, z], i * 3);
            rColor.toArray(colorArray, i * 3);
        }
        return { positions, colorArray };
    }, [count, color, radius]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (points.current) {
            points.current.rotation.y = t * 0.05;
            points.current.rotation.z = Math.sin(t * 0.1) * 0.1;
        }
    });

    return (
        <Points ref={points} positions={particlesPosition.positions} colors={particlesPosition.colorArray}>
            <PointMaterial
                transparent
                vertexColors
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const AbstractCore = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 2;
            meshRef.current.rotation.y = Math.sin(t / 2) / 2;
            meshRef.current.position.y = Math.sin(t / 1.5) / 10;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            {/* Inner glowing core */}
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 16]} />
                <MeshDistortMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={4}
                    speed={3}
                    distort={0.4}
                    radius={1}
                    wireframe
                />
            </mesh>
            {/* Outer glass shell */}
            <mesh scale={1.8}>
                <icosahedronGeometry args={[1, 4]} />
                <meshPhysicalMaterial
                    color="#b026ff"
                    transmission={0.9}
                    opacity={1}
                    metalness={0.9}
                    roughness={0.1}
                    ior={1.5}
                    thickness={0.5}
                    wireframe
                />
            </mesh>
        </Float>
    );
};

const Hero3D = () => {
    return (
        <div className="hero-3d-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={['#030305']} />

                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} intensity={2} color="#b026ff" />
                <spotLight position={[-10, -10, -10]} intensity={2} color="#00f0ff" />

                <group position={[0, 0, 0]}>
                    <AbstractCore />
                    <ParticleRing count={2000} color="#00f0ff" radius={4} />
                    <ParticleRing count={1500} color="#b026ff" radius={5.5} />
                </group>

                <EffectComposer enabled={true}>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={2.5}
                        radius={0.8}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Hero3D;
