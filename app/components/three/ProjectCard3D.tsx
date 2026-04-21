"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CardScene({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return;
    const t = state.clock.elapsedTime;

    const targetX = hovered ? targetRot.current.x * 0.4 : Math.sin(t * 0.4) * 0.08;
    const targetY = hovered ? targetRot.current.y * 0.4 : Math.cos(t * 0.3) * 0.06;

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.08;

    ringRef.current.rotation.z = t * 0.5;
    ringRef.current.rotation.x = t * 0.3;

    const targetScale = hovered ? 1.15 : 1;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    meshRef.current.scale.setScalar(newScale);

    (ringRef.current.material as THREE.MeshStandardMaterial).opacity = hovered ? 0.5 : 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={hovered ? 1.5 : 0.6} color="#5b7cf6" />
      <pointLight position={[-2, -2, 2]} intensity={0.3} color="#00e5a0" />
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#5b7cf6"
          emissive="#3a5cf0"
          emissiveIntensity={hovered ? 0.6 : 0.2}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.0, 0.02, 8, 40]} />
        <meshStandardMaterial
          color="#00e5a0"
          emissive="#00e5a0"
          emissiveIntensity={1}
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

export default function ProjectCard3D({ hovered }: { hovered: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <CardScene hovered={hovered} />
    </Canvas>
  );
}
