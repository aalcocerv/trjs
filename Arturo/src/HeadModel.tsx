import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Dummy({ rotationData }: { rotationData: any }) {
  const gltf = useGLTF("/Dummy/scene.gltf");
  const nodes = gltf.nodes;

  const headRef = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    headRef.current = nodes["mixamorigHead_06"];
  }, [nodes]);

  useFrame(() => {
    if (headRef.current) {
      headRef.current.rotation.x = rotationData.headRotation.x;
      headRef.current.rotation.y = rotationData.headRotation.y;
      headRef.current.rotation.z = rotationData.headRotation.z;
    }
  });

  return <primitive object={gltf.scene} />;
}

export default function HeadModel() {
  const [rotationData, setRotationData] = useState({
    headRotation: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.12:3000");

    socket.onopen = () => console.log("🟢 Conectado al ESP32");
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🟡 Datos recibidos:", data);
        setRotationData(data);
      } catch (error) {
        console.error("❌ Error parsing JSON:", error);
      }
    };
    socket.onerror = (error) => console.error("❌ Error WebSocket:", error);

    return () => socket.close();
  }, []);

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Dummy rotationData={rotationData} />
      <OrbitControls />
    </Canvas>
  );
}
