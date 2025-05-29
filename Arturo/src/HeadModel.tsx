import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";
import { Group } from "three";

export default function HeadModel({ rotationData }: { rotationData: any }) {
  const gltf = useLoader(GLTFLoader, "/Dummy/scene.gltf");
  const headRef = useRef<Group | null>(null);

  useEffect(() => {
    // Encuentra el nodo de la cabeza por nombre real
    const headNode = gltf.scene.getObjectByName("mixamorigHead_06");
    if (headNode) {
      console.log("✅ Nodo de la cabeza encontrado:", headNode.name);
      headRef.current = headNode as Group;
    } else {
      console.warn("⚠️ No se encontró la cabeza en el modelo.");
    }
  }, [gltf]);

  useFrame(() => {
    if (headRef.current && rotationData) {
      headRef.current.rotation.x = rotationData.x;
      headRef.current.rotation.y = rotationData.y;
      headRef.current.rotation.z = rotationData.z;
    }
  });

  return <primitive object={gltf.scene} />;
}
