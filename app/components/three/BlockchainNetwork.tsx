"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const nodeCount = 80;
  const { positions, edges } = useMemo(() => {
    const pos: number[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      pos.push(x, y, z);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    const edgePoints: number[] = [];
    const maxDist = 4.5;
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < maxDist) {
          edgePoints.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    return { positions: new Float32Array(pos), edges: new Float32Array(edgePoints) };
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(edges, 3));
    return geo;
  }, [edges]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.04 + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.15 + mouseRef.current.y * 0.2;
  });

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", handlePointerMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [handlePointerMove]);

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#5b7cf6"
          size={0.08}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color="#5b7cf6"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function FloatingHexagons() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const hexagons = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        Math.cos((i / 6) * Math.PI * 2) * 6 + (Math.random() - 0.5) * 3,
        Math.sin((i / 6) * Math.PI * 2) * 3 + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.4,
      phase: (i / 6) * Math.PI * 2,
    }));
  }, []);

  const hexGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.08, 6), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.y = t * hexagons[i].speed;
      mesh.rotation.z = Math.sin(t * hexagons[i].speed * 0.5 + hexagons[i].phase) * 0.3;
      mesh.position.y = hexagons[i].position[1] + Math.sin(t * 0.5 + hexagons[i].phase) * 0.4;
    });
  });

  return (
    <>
      {hexagons.map((hex, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={hex.position}
          scale={hex.scale}
          geometry={hexGeo}
        >
          <meshStandardMaterial
            color="#5b7cf6"
            transparent
            opacity={0.08}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.x = Math.sin(t * 0.3) * 2;
    meshRef.current.position.y = Math.cos(t * 0.2) * 1.5;
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.04 + Math.sin(t * 0.8) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#5b7cf6"
        transparent
        opacity={0.05}
        emissive="#5b7cf6"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function BlockchainNetwork() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#5b7cf6" />
        <pointLight position={[-10, -5, -5]} intensity={0.3} color="#00e5a0" />
        <NetworkNodes />
        <FloatingHexagons />
        <GlowOrb />
      </Canvas>
    </div>
  );
}
