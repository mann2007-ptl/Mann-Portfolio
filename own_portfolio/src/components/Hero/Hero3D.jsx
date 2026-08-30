import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const QuantumCore = () => {
    const coreRef = useRef();
    const ringRef1 = useRef();
    const ringRef2 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouseX = state.mouse.x * 0.8;
        const mouseY = state.mouse.y * 0.8;

        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.2 + mouseX;
            coreRef.current.rotation.x = t * 0.1 + mouseY;
        }
        if (ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.5 + mouseY;
            ringRef1.current.rotation.y = t * 0.3 + mouseX;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.x = -t * 0.3 + mouseY;
            ringRef2.current.rotation.y = -t * 0.5 + mouseX;
        }
    });

    return (
        <group>
            {/* The morphing liquid core */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={coreRef} args={[1.4, 128, 128]}>
                    <MeshDistortMaterial
                        color="#050505"
                        emissive="#1a1400"
                        emissiveIntensity={1}
                        roughness={0.1}
                        metalness={1}
                        distort={0.4}
                        speed={2.5}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </Sphere>
            </Float>

            {/* Orbiting energetic rings */}
            <mesh ref={ringRef1}>
                <torusGeometry args={[2.8, 0.015, 16, 100]} />
                <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} />
            </mesh>
            <mesh ref={ringRef2}>
                <torusGeometry args={[3.6, 0.008, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>

            {/* Intense sparkles orbiting the core */}
            <Sparkles count={500} scale={8} size={4} speed={0.5} opacity={0.8} color="#D4AF37" />
        </group>
    );
};

const DeepSpace = () => {
    return (
        <group>
            <Stars radius={15} depth={50} count={4000} factor={5} saturation={0} fade speed={1.5} />
        </group>
    );
}

const Hero3D = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 9], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={3} color="#D4AF37" />
            <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#ffffff" />
            
            <QuantumCore />
            <DeepSpace />
            
            <fog attach="fog" args={['#020202', 6, 20]} />
        </Canvas>
    );
};

export default Hero3D;
