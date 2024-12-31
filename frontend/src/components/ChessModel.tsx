"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ChessModel = ({ type }: { type: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(5, 0, -5); // 調整相機位置

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // 啟用陰影
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true; // 自動旋轉
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = false;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 環境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(3, 3, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Chess Piece Loader
    const loader = new GLTFLoader();
    let chessPiece: THREE.Group | undefined; // 引用模型以旋轉
    if (type === "pawn") {
      loader.load(
        "/models/chess_pawn/scene.gltf",
        (gltf: { scene: THREE.Group }) => {
          chessPiece = gltf.scene;
          chessPiece.scale.set(2.5, 2.5, 2.5); // 調整比例
          chessPiece.position.set(0, -1, 0); // 調整位置
          chessPiece.rotation.set(-0.2, 0, 0); // 調整旋轉
          scene.add(chessPiece);
        },
        undefined,
        (error: unknown) => {
          console.error("Error loading model:", error);
        },
      );
    } else {
      loader.load(
        "/models/chess_queen/scene.gltf",
        (gltf: { scene: THREE.Group }) => {
          chessPiece = gltf.scene;
          chessPiece.scale.set(0.5, 0.5, 0.5); // 調整比例
          chessPiece.position.set(0, -2, 0); // 調整位置
          chessPiece.rotation.set(-0.2, 0, 0); // 調整旋轉
          scene.add(chessPiece);
        },
        undefined,
        (error: unknown) => {
          console.error("Error loading model:", error);
        },
      );
    }

    // Animation Loop
    const animate = () => {
      if (chessPiece) {
        // 模型旋轉
        // chessPiece.rotation.y += 0.01; // 控制旋轉速度
      }
      controls.update(); // 更新控制器
      renderer.render(scene, camera); // 渲染場景
      // createGradientBackground(scene); // 創建漸層背景
      requestAnimationFrame(animate); // 遞迴動畫
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    // window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [type]);

  const createGradientBackground = (scene: THREE.Scene) => {
    // 創建平面
    const planeGeometry = new THREE.PlaneGeometry(20, 20);

    // 使用 CanvasTexture 製作漸層
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // 定義漸層
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#D43837"); // 頂部顏色
    gradient.addColorStop(1, "#72171C"); // 底部顏色

    // 塗抹漸層
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);

    // 材質
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, material);

    // 設置平面作為背景
    plane.position.z = -5; // 放在相機後面
    // plane.rotation.x = Math.PI / 2; // 調整平面方向
    scene.add(plane);
  };

  return (
    <div
      className="bg-circle h-full w-full overflow-hidden rounded-full"
      ref={mountRef}
    />
  );
};

export default ChessModel;
