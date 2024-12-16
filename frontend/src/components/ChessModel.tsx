"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const ChessPiece = () => {
  const chessPiece = useGLTF("/models/chess_pawn/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="blue" />
      <primitive object={chessPiece.scene} scale={1} position={[0, 0, 0]} />
    </mesh>
  );
};

const ChessModel = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
      <ChessPiece />

      <Preload all />
    </Canvas>
  );
};

export default ChessModel;
