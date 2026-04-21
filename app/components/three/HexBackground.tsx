"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HexField() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const hexagons = useMemo(() => {
    const items = [];
    const cols = 9, rows = 5;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        items.push({
          x: (c - cols / 2) * 2.5 + (r % 2 ? 1.25 : 0),
          y: (r - rows / 2) * 2.1,
          z: -4 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.35,
          scale: 0.4 + Math.random() * 0.5,
        });
      }
    }
    return items;
  }, []);

  const geo = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.05, 6), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.01;
    }
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const h = hexagons[i];
      mesh.position.z = h.z + Math.sin(t * h.speed + h.phase) * 0.5;
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        0.04 + Math.sin(t * h.speed + h.phase) * 0.03;
    });
  });

  return (
    <group ref={groupRef}>
      {hexagons.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[h.x, h.y, h.z]}
          scale={h.scale}
          geometry={geo}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color="#5b7cf6"
            transparent
            opacity={0.05}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function ScanLine() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -5 + ((t * 0.8) % 12);
    (ref.current.material as THREE.MeshStandardMaterial).opacity =
      0.06 + Math.sin(t * 2) * 0.03;
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <planeGeometry args={[30, 0.04]} />
      <meshStandardMaterial color="#5b7cf6" transparent opacity={0.07} emissive="#5b7cf6" emissiveIntensity={1} />
    </mesh>
  );
}

export default function HexBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#5b7cf6" />
        <HexField />
        <ScanLine />
      </Canvas>
    </div>
  );
}
