import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const TechNode = ({ position, color, icon, name, index }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Add a subtle individual floating effect to each node
        if (meshRef.current) {
            meshRef.current.position.x = position.x + Math.sin(t * 2 + index) * 0.1;
            meshRef.current.position.y = position.y + Math.cos(t * 2 + index) * 0.1;
            meshRef.current.position.z = position.z + Math.sin(t * 2 + index) * 0.1;

            // Look at center to keep HTML facing mostly outward
            meshRef.current.lookAt(0, 0, 0);
            // Flip 180 so the HTML faces OUTWARD from the sphere instead of inward
            meshRef.current.rotateY(Math.PI);
        }
    });

    return (
        <group
            ref={meshRef}
            position={[position.x, position.y, position.z]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Core Node Glass Sphere */}
            <mesh>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshPhysicalMaterial
                    color={hovered ? color : "#ffffff"}
                    transmission={0.9}
                    opacity={1}
                    metalness={0.8}
                    roughness={0.1}
                    ior={1.5}
                    thickness={0.5}
                />
            </mesh>

            {/* Glowing inner core when hovered */}
            {hovered && (
                <mesh scale={0.8}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.6} />
                </mesh>
            )}

            {/* Light emission */}
            <pointLight
                distance={3}
                intensity={hovered ? 2 : 0.5}
                color={hovered ? color : "#ffffff"}
            />

            {/* Tech Label / Icon */}
            <Html transform distanceFactor={15} zIndexRange={[100, 0]}>
                <div
                    className={`tech-node-label ${hovered ? 'active' : ''}`}
                    style={{
                        '--node-color': color,
                        opacity: hovered ? 1 : 0.6,
                        transform: hovered ? 'scale(1.2)' : 'scale(1)'
                    }}
                >
                    <div className="flex flex-col items-center justify-center gap-2 drop-shadow-2xl">
                        <span className="text-3xl" style={{ color: hovered ? color : '#fff', filter: hovered ? `drop-shadow(0 0 10px ${color})` : 'none' }}>
                            {icon}
                        </span>
                        <span className="font-bold tracking-wider text-xs uppercase" style={{ color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                            {name}
                        </span>
                    </div>
                </div>
            </Html>
        </group>
    );
};

const SphereNetwork = ({ skills }) => {
    const groupRef = useRef();

    // Distribute nodes evenly on a sphere using Fibonacci lattice
    const distribution = useMemo(() => {
        const nodes = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        const radius = 6; // Radius of the sphere

        for (let i = 0; i < skills.length; i++) {
            const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            nodes.push({
                ...skills[i],
                pos: new THREE.Vector3(x * radius, y * radius, z * radius)
            });
        }
        return nodes;
    }, [skills]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Constant slow rotation of the entire network
            groupRef.current.rotation.y = t * 0.1;
            groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {distribution.map((node, i) => (
                <TechNode
                    key={i}
                    index={i}
                    position={node.pos}
                    color={node.color}
                    icon={node.icon}
                    name={node.name}
                />
            ))}
            {/* Center Core Glow */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} wireframe />
            </mesh>
            <pointLight color="#b026ff" intensity={3} distance={15} />
        </group>
    );
};

export const Scene3D = ({ skills }) => {
    return (
        <Canvas camera={{ position: [0, 0, 16], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['transparent']} />
            <ambientLight intensity={0.2} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                autoRotate
                autoRotateSpeed={0.5}
            />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <SphereNetwork skills={skills} />
            </Float>
        </Canvas>
    );
};
