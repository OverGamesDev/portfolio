"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusMesh() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);

  const particleGeo = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.2 + (Math.random() - 0.5) * 1.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = t * 0.3;
      outer.current.rotation.z = t * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.5;
      inner.current.rotation.z = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.2;
      ring2.current.rotation.y = t * 0.35;
    }
    if (particles.current) {
      particles.current.rotation.y = t * 0.08;
    }
  });

  return (
    <>
      <mesh ref={outer}>
        <torusGeometry args={[2, 0.04, 12, 80]} />
        <meshStandardMaterial color="#5b7cf6" emissive="#5b7cf6" emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[1.3, 0.03, 10, 60]} />
        <meshStandardMaterial color="#00e5a0" emissive="#00e5a0" emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.7, 0.02, 8, 60]} />
        <meshStandardMaterial color="#7c9cff" emissive="#7c9cff" emissiveIntensity={0.4} transparent opacity={0.35} />
      </mesh>
      <points ref={particles} geometry={particleGeo}>
        <pointsMaterial color="#5b7cf6" size={0.04} transparent opacity={0.6} sizeAttenuation />
      </points>
    </>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#5b7cf6" />
      <pointLight position={[-3, -3, 3]} intensity={0.6} color="#00e5a0" />
      <TorusMesh />
    </Canvas>
  );
}
