import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary.jsx';

function NodeNetwork() {
  const groupRef = useRef();

  // Generate node positions and connecting line geometry
  const { positions, lineGeometry } = useMemo(() => {
    const count = 45;
    const pos = new Float32Array(count * 3);
    const lineCoords = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Connect close nodes with line segments
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 3.2) {
          lineCoords.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          lineCoords.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));

    return { positions: pos, lineGeometry: lineGeo };
  }, []);

  // Subtle rotation animation in R3F render loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Spheres */}
      {Array.from({ length: positions.length / 3 }).map((_, i) => (
        <mesh key={i} position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {/* Interconnecting Data Stream Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <ErrorBoundary fallback={<div className="hero-fallback-bg" />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
          <NodeNetwork />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
