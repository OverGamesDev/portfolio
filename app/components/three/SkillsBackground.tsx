"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DNAHelix() {
  const ref = useRef<THREE.Group>(null);

  const { strand1, strand2, rungs } = useMemo(() => {
    const count = 60;
    const s1: number[] = [], s2: number[] = [], r: number[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8;
      const y = (i / count) * 20 - 10;
      const x1 = Math.cos(t) * 1.5, z1 = Math.sin(t) * 1.5;
      const x2 = Math.cos(t + Math.PI) * 1.5, z2 = Math.sin(t + Math.PI) * 1.5;
      s1.push(x1, y, z1);
      s2.push(x2, y, z2);
      if (i % 4 === 0) { r.push(x1, y, z1, x2, y, z2); }
    }
    const g1 = new THREE.BufferGeometry(); g1.setAttribute("position", new THREE.BufferAttribute(new Float32Array(s1), 3));
    const g2 = new THREE.BufferGeometry(); g2.setAttribute("position", new THREE.BufferAttribute(new Float32Array(s2), 3));
    const gr = new THREE.BufferGeometry(); gr.setAttribute("position", new THREE.BufferAttribute(new Float32Array(r), 3));
    return { strand1: g1, strand2: g2, rungs: gr };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.position.y = Math.sin(t * 0.2) * 0.5;
  });

  const line1 = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#5b7cf6", transparent: true, opacity: 0.4 });
    return new THREE.Line(strand1, mat);
  }, [strand1]);
  const line2 = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#00e5a0", transparent: true, opacity: 0.4 });
    return new THREE.Line(strand2, mat);
  }, [strand2]);
  const rungLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.08 });
    return new THREE.LineSegments(rungs, mat);
  }, [rungs]);

  return (
    <group ref={ref} position={[5, 0, -3]} scale={0.6}>
      <primitive object={line1} />
      <primitive object={line2} />
      <primitive object={rungLine} />
    </group>
  );
}

function FloatingCubes() {
  const cubes = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    x: (Math.random() - 0.5) * 18,
    y: (Math.random() - 0.5) * 10,
    z: -5 + Math.random() * 2,
    size: 0.15 + Math.random() * 0.35,
    phase: (i / 12) * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.4,
    color: i % 3 === 0 ? "#5b7cf6" : i % 3 === 1 ? "#00e5a0" : "#a78bfa",
  })), []);

  return (
    <>
      {cubes.map((c, i) => <FloatingCube key={i} {...c} />)}
    </>
  );
}

function FloatingCube({ x, y, z, size, phase, speed, color }: { x: number; y: number; z: number; size: number; phase: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed;
    ref.current.rotation.y = t * speed * 0.7;
    ref.current.position.y = y + Math.sin(t * speed * 0.5 + phase) * 0.6;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.12 + Math.sin(t * speed + phase) * 0.06;
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} transparent opacity={0.12} wireframe />
    </mesh>
  );
}

export default function SkillsBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#a78bfa" />
        <DNAHelix />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
