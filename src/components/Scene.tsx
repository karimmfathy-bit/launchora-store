"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Grid, ContactShadows, PerspectiveCamera, Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Smooth mouse parallax
    const targetX = (state.pointer.x * 2) / 2;
    const targetY = (state.pointer.y * 2) / 2;
    
    // Scroll-driven camera flythrough
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Camera moves forward on Z axis based on scroll (starts at 8, goes to -10)
    const targetZ = 8 - (scrollProgress * 15);
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    
    // Smoothly interpolate Z position for scroll
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    
    // Camera slightly looks down as you scroll
    const targetLookAtY = -scrollProgress * 2;
    state.camera.lookAt(0, targetLookAtY, 0);
  });
  return null;
}

function FloatingObjects() {
  const group = useRef<THREE.Group>(null);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Object 1: Neon Orange Torus */}
      <Float speed={hovered1 ? 6 : 2} rotationIntensity={hovered1 ? 3 : 1} floatIntensity={hovered1 ? 3 : 2} position={[-2, 1, -2]}>
        <mesh 
          onPointerOver={() => setHovered1(true)}
          onPointerOut={() => setHovered1(false)}
        >
          <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
          <meshStandardMaterial 
            color={hovered1 ? "#ffffff" : "#ff4500"} 
            emissive={hovered1 ? "#ffaa00" : "#ff4500"} 
            emissiveIntensity={hovered1 ? 2 : 0.5} 
            wireframe 
          />
        </mesh>
      </Float>

      {/* Object 2: Emerald Icosahedron */}
      <Float speed={hovered2 ? 5 : 1.5} rotationIntensity={hovered2 ? 4 : 1.5} floatIntensity={hovered2 ? 2.5 : 1.5} position={[2, 1.5, -1]}>
        <mesh
          onPointerOver={() => setHovered2(true)}
          onPointerOut={() => setHovered2(false)}
        >
          <icosahedronGeometry args={[0.6, 0]} />
          <meshPhysicalMaterial 
            color={hovered2 ? "#ffffff" : "#00ffaa"} 
            emissive={hovered2 ? "#00ffff" : "#00ffaa"} 
            emissiveIntensity={hovered2 ? 1.5 : 0.2}
            transmission={0.9} 
            thickness={1} 
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Object 3: Dark Glass Sphere */}
      <Float speed={hovered3 ? 8 : 3} rotationIntensity={hovered3 ? 2 : 0.5} floatIntensity={hovered3 ? 2 : 1} position={[0, 2, -3]}>
        <mesh
          onPointerOver={() => setHovered3(true)}
          onPointerOut={() => setHovered3(false)}
        >
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshPhysicalMaterial 
            color={hovered3 ? "#8888ff" : "#ffffff"} 
            transmission={1} 
            thickness={2} 
            roughness={0} 
            ior={1.5} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#020205]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        <CameraRig />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffaa" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#ff4500" />
        
        <Environment preset="city" />

        <FloatingObjects />

        {/* 3D Particles & Stars */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.2} color="#00e5ff" position={[0, 0, -5]} />
        <Sparkles count={100} scale={10} size={3} speed={0.8} opacity={0.5} color="#ff4500" position={[0, 0, -2]} />

        {/* Glowing Cutting Mat / Grid Surface */}
        <Grid 
          position={[0, -1, 0]} 
          args={[40, 40]} 
          cellSize={0.5} 
          cellThickness={1} 
          cellColor="#1a1a1a" 
          sectionSize={2.5} 
          sectionThickness={1.5} 
          sectionColor="#333333" 
          fadeDistance={30} 
          fadeStrength={1} 
        />
        
        {/* Soft ground shadows */}
        <ContactShadows position={[0, -0.99, 0]} opacity={0.4} scale={30} blur={2} far={10} color="#000000" />
        
        {/* Post Processing Effects */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.002, 0.002)} 
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
