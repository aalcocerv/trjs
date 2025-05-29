// src/HeadSimulation.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group, Quaternion, Euler } from 'three';

const HeadModel: React.FC = () => {
  const { scene, camera } = useThree();
  const headRef = useRef<Group | null>(null);
  const shoulderRef = useRef<Group | null>(null);
  const forearmRef = useRef<Group | null>(null); // 👈 Nuevo: referencia al codo

  useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  const { scene: gltfScene } = useGLTF('/Dummy/scene.gltf') as any;

  useEffect(() => {
    gltfScene.traverse((node: any) => {
      if (node.name === 'mixamorigHead_06') {
        headRef.current = node;
        console.log('✔️ Nodo de cabeza encontrado:', node.name);
      }
      if (node.name === 'mixamorigRightShoulder_016') {
        shoulderRef.current = node;
        console.log('✔️ Nodo de hombro derecho encontrado:', node.name);
      }
      if (node.name === 'mixamorigRightForeArm_018') { // 👈 Nodo del codo derecho
        forearmRef.current = node;
        console.log('✔️ Nodo de codo derecho encontrado:', node.name);
      }
    });
  }, [gltfScene]);

  useFrame(() => {
    fetch('/Dummy/mockHeadRotation.json')
      .then(res => res.json())
      .then((data) => {
        const { headRotation, shoulderRotation, forearmRotation } = data;

        if (headRef.current) {
          const euler = new Euler(
            headRotation.x,
            headRotation.y,
            headRotation.z,
            'XYZ'
          );
          const quat = new Quaternion().setFromEuler(euler);
          headRef.current.quaternion.copy(quat);
        }

        if (shoulderRef.current) {
          const euler = new Euler(
            shoulderRotation.x,
            shoulderRotation.y,
            shoulderRotation.z,
            'XYZ'
          );
          const quat = new Quaternion().setFromEuler(euler);
          shoulderRef.current.quaternion.copy(quat);
        }

        if (forearmRef.current) {
          const euler = new Euler(
            forearmRotation.x,
            forearmRotation.y,
            forearmRotation.z,
            'XYZ'
          );
          const quat = new Quaternion().setFromEuler(euler);
          forearmRef.current.quaternion.copy(quat);
        }
      })
      .catch((err) => console.error('Error al leer JSON:', err));
  });

  return (
    <>
      <primitive object={gltfScene} />
      <OrbitControls />
    </>
  );
};

const HeadSimulation: React.FC = () => {
  return (
    <Canvas style={{ background: '#1a1a1a' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <HeadModel />
    </Canvas>
  );
};

export default HeadSimulation;
