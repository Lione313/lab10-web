"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from '@react-three/drei';
import { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { CubeTextureLoader } from "three";


function DeliveryCar() {
  const carRef = useRef<any>(null);
  const speed = 0.05;

  useFrame(({ clock }) => {
    if (carRef.current) {
      const time = clock.getElapsedTime();
      carRef.current.position.z = Math.sin(time * speed * 10) * 5;
    }
  });

  return (
    <group ref={carRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Cuerpo principal */}
      <RoundedBox
        args={[5, 2.4, 3.5]}
        radius={0.2}
        smoothness={4}
        position={[0, 1.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#7f8c8d" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Cabina */}
      <RoundedBox
        args={[1.5, 2.0, 2.5]}
        radius={0.2}
        smoothness={4}
        position={[3.5, 1.0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#95a5a6" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Ventanas */}
      <mesh position={[4.25, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 1.6, 2.0]} />
        <meshStandardMaterial
          color="#a3c4f3"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {[[-1.1], [1.1]].map((z, i) => (
        <mesh key={i} position={[3.55, 1.5, z[0]]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 1.0, 0.05]} />
          <meshStandardMaterial
            color="#a3c4f3"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Faros */}
      <mesh position={[4.3, 1.0, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          emissive="#f1c40f"
          emissiveIntensity={0.8}
          color="#ffffff"
        />
      </mesh>
      <mesh position={[4.3, 1.0, -0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          emissive="#f1c40f"
          emissiveIntensity={0.8}
          color="#ffffff"
        />
      </mesh>

      {/* Manijas */}
      <mesh position={[4.2, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      <mesh position={[1.5, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Ruedas */}
      {[
        [2.8, 0.3, 1.5],
        [2.8, 0.3, -1.5],
        [-1.3, 0.3, 1.5],
        [-1.3, 0.3, -1.5],
      ].map(([x, y, z], i) => (
        <group
          key={i}
          position={[x, y, z]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1.5, 1.5, 1.5]}
        >
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.4, 0.15, 16, 100]} />
            <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh scale={[0.6, 0.6, 0.6]}>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
            <meshStandardMaterial color="#7f8c8d" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}






export default function LoadingProduct() {
  return (
    <div style={{ width: "100%", height: "250px" }}>
      <Canvas shadows camera={{ position: [0, 6, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 7]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Plano para sombra */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        <DeliveryCar />
      </Canvas>
    </div>
  );
}
