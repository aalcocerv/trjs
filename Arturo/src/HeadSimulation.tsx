import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HeadModel from "./HeadModel";
import { useEffect, useState } from "react";

export default function HeadSimulation() {
  const [rotationData, setRotationData] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/Dummy/mockHeadRotation.json");
        const data = await response.json();
        setRotationData(data);
      } catch (error) {
        console.error("Error al cargar el JSON:", error);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <HeadModel rotationData={rotationData} />
      <OrbitControls />
    </Canvas>
  );
}
