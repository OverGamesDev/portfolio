"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WarpTunnel() {
  const { positions, velocities, geo } = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 3.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vel[i] = 0.03 + Math.random() * 0.06;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { positions: pos, velocities: vel, geo: g };
  }, []);

  useFrame(() => {
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3 + 2] += velocities[i];
      if (arr[i * 3 + 2] > 10) arr[i * 3 + 2] = -15;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points geometry={geo}>
      <pointsMaterial color="#5b7cf6" size={0.055} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function NodeWeb() {
  const ref = useRef<THREE.Group>(null);

  const { lineGeo, dotGeo } = useMemo(() => {
    const count = 28;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 4 - 2
      ));
    }
    const edges: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 5.5) {
          edges.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edges), 3));

    const dotArr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => { dotArr[i * 3] = p.x; dotArr[i * 3 + 1] = p.y; dotArr[i * 3 + 2] = p.z; });
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.BufferAttribute(dotArr, 3));

    return { lineGeo: lg, dotGeo: dg };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.007) * 0.04;
  });

  return (
    <group ref={ref}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#5b7cf6" transparent opacity={0.07} depthWrite={false} />
      </lineSegments>
      <points geometry={dotGeo}>
        <pointsMaterial color="#7c9cff" size={0.09} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
      </points>
    </group>
  );
}

export default function BlockchainNetwork() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <WarpTunnel />
        <NodeWeb />
      </Canvas>
    </div>
  );
}
