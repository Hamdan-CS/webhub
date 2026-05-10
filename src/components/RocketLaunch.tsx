import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Rocket({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const rocketRef = useRef<THREE.Group>();
  const initialY = -2;
  const targetY = 10;
  const duration = 4;
  const startTime = Date.now();

  useFrame(() => {
    if (rocketRef.current) {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      rocketRef.current.position.y = initialY + (targetY - initialY) * progress;
      rocketRef.current.rotation.z = Math.sin(elapsed * 2) * 0.1;

      if (progress === 1) {
        onAnimationComplete();
      }
    }
  });

  return (
    <group ref={rocketRef} position={[0, initialY, 0]}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.5, 2, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.2, 0.5, 32]} />
        <meshStandardMaterial color="#FF4500" metalness={0.8} roughness={0.2} />
      </mesh>
      <group position={[0, -1, 0]}>
        {[-1, 0, 1].map((x) => (
          <mesh key={x} position={[x * 0.3, 0, 0]}>
            <boxGeometry args={[0.2, 0.5, 0.1]} />
            <meshStandardMaterial color="#4169E1" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function RocketLaunch({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Rocket onAnimationComplete={onComplete} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Environment preset="night" />
      </Canvas>
    </motion.div>
  );
}