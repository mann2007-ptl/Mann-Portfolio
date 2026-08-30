import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GoldSphere = () => {
    const meshRef = useRef();
    const wireRef = useRef();

    // Subtle floating and rotation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouseX = (state.mouse.x * Math.PI) / 10;
        const mouseY = (state.mouse.y * Math.PI) / 10;

        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.1 + mouseY;
            meshRef.current.rotation.y = t * 0.15 + mouseX;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
        }
        if (wireRef.current) {
            wireRef.current.rotation.x = t * 0.1 + mouseY;
            wireRef.current.rotation.y = t * 0.15 + mouseX;
            wireRef.current.position.y = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <group>
            {/* Inner Core */}
            <Icosahedron args={[1.5, 4]} ref={meshRef}>
                <MeshDistortMaterial
                    color="#080808"
                    attach="material"
                    distort={0.2}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Icosahedron>

            {/* Golden Wireframe */}
            <Icosahedron args={[1.52, 4]} ref={wireRef}>
                <MeshDistortMaterial
                    color="#D4AF37"
                    emissive="#D4AF37"
                    emissiveIntensity={0.5}
                    attach="material"
                    distort={0.2}
                    speed={1.5}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Icosahedron>
        </group>
    );
};

const FloatingParticles = () => {
    const points = useRef();
    const count = 150;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (points.current) {
            points.current.rotation.y = t * 0.05;
            points.current.rotation.x = Math.sin(t * 0.1) * 0.2;
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
                size={0.03}
                color="#D4AF37"
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
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[3, 3, 3]} intensity={2} color="#D4AF37" distance={10} />
            <pointLight position={[-3, -2, 2]} intensity={0.5} color="#ffffff" distance={8} />
            <GoldSphere />
            <FloatingParticles />
            <fog attach="fog" args={['#020202', 4, 15]} />
        </Canvas>
    );
};

export default Hero3D;
