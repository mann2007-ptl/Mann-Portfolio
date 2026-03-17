import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const InfiniteNeonGrid = () => {
    const gridRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Constant forward motion
        gridRef.current.position.y = (t * 0.5) % 2 - 1;
        // Subtle wave effect
        gridRef.current.position.z = Math.sin(t * 0.5) * 0.3;
    });

    return (
        <group position={[0, -2, -2]} rotation={[Math.PI / 2.2, 0, 0]}>
            <mesh ref={gridRef}>
                <planeGeometry args={[100, 100, 40, 40]} />
                <meshStandardMaterial
                    color="#b026ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};

const Contact3D = () => {
    return (
        <div className="contact-3d-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 5, 0]} intensity={2} color="#00f0ff" distance={20} />
                <InfiniteNeonGrid />

                {/* Fog to fade out the grid into the distance */}
                <fog attach="fog" args={['#030305', 2, 15]} />
            </Canvas>
        </div>
    );
};

export default Contact3D;
