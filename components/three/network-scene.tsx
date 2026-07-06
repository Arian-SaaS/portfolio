"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Evenly distributes points on a sphere using a Fibonacci lattice —
// reads as an intentional "system," not a random point cloud.
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function nearestNeighborEdges(points: THREE.Vector3[], neighborsPerNode: number) {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  const seen = new Set<string>();
  points.forEach((point, i) => {
    const distances = points
      .map((other, j) => ({ j, dist: point.distanceTo(other) }))
      .filter((d) => d.j !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, neighborsPerNode);
    distances.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([point, points[j]]);
      }
    });
  });
  return edges;
}

function ArchitectureGraph({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const nodes = React.useMemo(() => fibonacciSphere(14, 1.6), []);
  const edges = React.useMemo(() => nearestNeighborEdges(nodes, 2), [nodes]);

  useFrame((_, delta) => {
    if (reduceMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      {edges.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color="#22d3ee" transparent opacity={0.25} lineWidth={1} />
      ))}
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <icosahedronGeometry args={[i % 5 === 0 ? 0.09 : 0.055, 0]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#22d3ee" : "#3b82f6"} />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkScene() {
  const reduceMotion = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      frameloop={reduceMotion ? "demand" : "always"}
    >
      <Float speed={reduceMotion ? 0 : 1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <ArchitectureGraph reduceMotion={reduceMotion} />
      </Float>
    </Canvas>
  );
}
