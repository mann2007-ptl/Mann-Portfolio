import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useScroll, PerspectiveCamera, Stars as DreiStars, Sparkles, ScrollControls } from '@react-three/drei';

const Earth = () => {
    return (
        <group position={[0, 0, -50]}>
            <mesh>
                <sphereGeometry args={[15, 64, 64]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    emissive="#000033"
                    metalness={0.4}
                    roughness={0.7}
                />
            </mesh>
            <mesh scale={1.05}>
                <sphereGeometry args={[15, 64, 64]} />
                <meshStandardMaterial
                    color="#4dabf7"
                    transparent
                    opacity={0.15}
                    side={2}
                />
            </mesh>
        </group>
    );
};

const Laptop = ({ children }) => {
    return (
        <group position={[0, 0, -100]}>
            {/* Base */}
            <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[4.6, 0.2, 3]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Screen frame - subtly curved or minimalist */}
            <mesh position={[0, 1.5, -1.5]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[4.8, 3.4, 0.05]} />
                <meshStandardMaterial color="#000" />
                <group position={[0, 0, 0.03]}>
                    <Html
                        transform
                        distanceFactor={2.5}
                        className="laptop-screen-content"
                    >
                        <div style={{
                            width: '100vw',
                            height: '100vh',
                            background: '#010103',
                            overflow: 'auto',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}>
                            {children}
                        </div>
                    </Html>
                </group>
            </mesh>
        </group>
    );
};

const CameraRig = () => {
    const scroll = useScroll();

    useFrame((state) => {
        const offset = scroll.offset;

        if (offset < 0.6) {
            // Stage 1: Space Travel to Earth
            const p = offset / 0.6;
            state.camera.position.z = 60 - (p * 95);
            state.camera.lookAt(0, 0, -50);
        } else {
            // Stage 2: Earth to Full-Screen Laptop
            const p = (offset - 0.6) / 0.4;
            // Target Z for full screen: very close to the Html plane
            state.camera.position.z = -35 - (p * 66.44);
            state.camera.position.y = p * 1.56;
            state.camera.lookAt(0, 1.56, -101.5);

            // Adjust FOV for seamless landing
            state.camera.fov = 75 - (p * 15);
            state.camera.updateProjectionMatrix();
        }
    });

    return null;
};

const Background3D = ({ children }) => {
    return (
        <div className="background-3d-container">
            <Canvas dpr={[1, 2]}>
                <color attach="background" args={['#010103']} />
                <PerspectiveCamera makeDefault fov={75} position={[0, 0, 60]} />

                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#4dabf7" />

                <Sparkles count={4000} scale={150} size={3} speed={0.8} color="#fff" />
                <DreiStars radius={500} depth={100} count={30000} factor={8} saturation={0} fade speed={1.5} />

                <ScrollControls pages={6} damping={0.1}>
                    <Earth />
                    <Laptop>
                        {children}
                    </Laptop>
                    <CameraRig />
                </ScrollControls>
            </Canvas>
        </div>
    );
};

export default Background3D;
