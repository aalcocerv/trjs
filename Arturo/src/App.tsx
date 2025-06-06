import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import HeadModel from "./HeadModel";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <HeadModel />
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  );
}
