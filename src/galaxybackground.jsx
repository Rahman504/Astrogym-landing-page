import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

function GlowingStars() {
  const starRef = useRef();
  const texture = useMemo(() => createStarTexture(), []);
  const { camera } = useThree();

  const { positions, speeds } = useMemo(() => {
    const pos = [];
    const speedArr = [];
    for (let i = 0; i < 3000; i++) {
      pos.push((Math.random() - 0.5) * 1000);
      pos.push((Math.random() - 0.5) * 1000);
      pos.push((Math.random() - 0.5) * 1000);
      speedArr.push((Math.random() - 0.5) * 0.001);
    }
    return { positions: new Float32Array(pos), speeds: speedArr };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.z = 400 - scrollY * 0.5;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  useFrame(() => {
    const positionsArray = starRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positionsArray.length; i += 3) {
      positionsArray[i] += speeds[i % speeds.length] * 2;
      positionsArray[i + 1] += speeds[(i + 1) % speeds.length] * 2;
      positionsArray[i + 2] += speeds[(i + 2) % speeds.length] * 2;

      if (positionsArray[i] > 500) positionsArray[i] = -500;
      if (positionsArray[i] < -500) positionsArray[i] = 500;
      if (positionsArray[i + 1] > 500) positionsArray[i + 1] = -500;
      if (positionsArray[i + 1] < -500) positionsArray[i + 1] = 500;
      if (positionsArray[i + 2] > 500) positionsArray[i + 2] = -500;
      if (positionsArray[i + 2] < -500) positionsArray[i + 2] = 500;
    }
    starRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Planet({ texturePath, size, radius, initialAngle, speed, bend, rings }) {
  const meshRef = useRef();
  const texture = useMemo(() => new THREE.TextureLoader().load(texturePath), [texturePath]);
  const [angle, setAngle] = useState(initialAngle);

  useFrame(() => {
    setAngle((prev) => prev + speed);

    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = bend * Math.sin(angle * 2);
    meshRef.current.position.set(x, y, z);

    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {rings && (
        <mesh rotation={rings.rotation}>
          <ringGeometry args={[rings.innerRadius, rings.outerRadius, 64]} />
          <meshStandardMaterial
            color={rings.color || "lightgray"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
}

export default function GalaxyBackground() {
  const planets = [
    { name: "Mercury", texture: "/textures/mercury.jpg", size: 20, radius: 200, speed: 0.01 },
    { name: "Venus", texture: "/textures/venus.jpg", size: 26, radius: 220, speed: 0.008 },
    { name: "Earth", texture: "/textures/earth.jpg", size: 28, radius: 240, speed: 0.007 },
    { name: "Mars", texture: "/textures/mars.jpg", size: 22, radius: 260, speed: 0.006 },
    {
      name: "Jupiter",
      texture: "/textures/jupiter.jpg",
      size: 50,
      radius: 300,
      speed: 0.004,
    },
    {
      name: "Saturn",
      texture: "/textures/saturn.jpg",
      size: 44,
      radius: 340,
      speed: 0.003,
    },
    {
      name: "Uranus",
      texture: "/textures/uranus.jpg",
      size: 34,
      radius: 380,
      speed: 0.0025,
    },
    {
      name: "Neptune",
      texture: "/textures/neptune.jpg",
      size: 32,
      radius: 420,
      speed: 0.002,
    },
  ];

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "black",
        pointerEvents: "none",
      }}
      camera={{ position: [0, 50, 400], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} intensity={1} />
      <GlowingStars />

      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          texturePath={planet.texture}
          size={planet.size}
          radius={planet.radius}
          speed={planet.speed}
          initialAngle={(2 * Math.PI * index) / planets.length}
          bend={20}
          rings={
            planet.name === "Saturn"
              ? {
                  innerRadius: 27,
                  outerRadius: 42,
                  rotation: [Math.PI / 2.5, 0, 0],
                  color: "lightgoldenrodyellow",
                }
              : null
          }
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

function createStarTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 200, 0.8)");
  gradient.addColorStop(0.4, "rgba(255, 200, 100, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}
