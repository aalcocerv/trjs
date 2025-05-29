// src/HeadSimulation.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Group, Quaternion, Euler } from 'three';

const HeadModel: React.FC = () => {
  const { scene, camera } = useThree();

  // Referencias de las partes a animar
  const headRef = useRef<Group | null>(null);
  const shoulderRRef = useRef<Group | null>(null);
  const shoulderLRef = useRef<Group | null>(null);
  const forearmRRef = useRef<Group | null>(null);
  const forearmLRef = useRef<Group | null>(null);
  const hipRef = useRef<Group | null>(null);
  const kneeRRef = useRef<Group | null>(null);
  const kneeLRef = useRef<Group | null>(null);

  useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  const { scene: gltfScene } = useGLTF('/Dummy/scene.gltf') as any;

  // Encontramos y guardamos las referencias de las partes
  useEffect(() => {
    gltfScene.traverse((node: any) => {
      if (node.name === 'mixamorigHead_06') headRef.current = node;
      if (node.name === 'mixamorigRightShoulder_016') shoulderRRef.current = node;
      if (node.name === 'mixamorigLeftShoulder_08') shoulderLRef.current = node;
      if (node.name === 'mixamorigRightForeArm_018') forearmRRef.current = node;
      if (node.name === 'mixamorigLeftForeArm_010') forearmLRef.current = node;
      if (node.name === 'mixamorigHips_01') hipRef.current = node;
      if (node.name === 'mixamorigRightLeg_029') kneeRRef.current = node;
      if (node.name === 'mixamorigLeftLeg_025') kneeLRef.current = node;
    });
  }, [gltfScene]);

  useFrame(() => {
    fetch('/Dummy/mockHeadRotation.json')
      .then(res => res.json())
      .then((data) => {
        const {
          headRotation,
          shoulderRRotation,
          shoulderLRotation,
          forearmRRotation,
          forearmLRotation,
          hipRotation,
          kneeRRotation,
          kneeLRotation
        } = data;

        const applyRotation = (ref: React.MutableRefObject<Group | null>, rot: any) => {
          if (ref.current && rot) {
            const euler = new Euler(rot.x, rot.y, rot.z, 'XYZ');
            const quat = new Quaternion().setFromEuler(euler);
            ref.current.quaternion.copy(quat);
          }
        };

        applyRotation(headRef, headRotation);
        applyRotation(shoulderRRef, shoulderRRotation);
        applyRotation(shoulderLRef, shoulderLRotation);
        applyRotation(forearmRRef, forearmRRotation);
        applyRotation(forearmLRef, forearmLRotation);
        applyRotation(hipRef, hipRotation);
        applyRotation(kneeRRef, kneeRRotation);
        applyRotation(kneeLRef, kneeLRotation);
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
