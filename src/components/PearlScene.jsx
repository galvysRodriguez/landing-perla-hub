import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const PARTICLES = 1800;
const COLORS = ["#818cf8", "#4f46e5", "#34d399", "#10b981", "#e2e8f0"].map((c) => new THREE.Color(c));
const SOURCES = [
  { radius: 2.3, speed: 0.35, tilt: 0.5, color: "#818cf8" },
  { radius: 2.9, speed: -0.25, tilt: -0.35, color: "#34d399" },
  { radius: 3.5, speed: 0.18, tilt: 0.15, color: "#e2e8f0" },
];

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

// Seeded random so the swarm looks the same on every visit.
function random(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function dotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/** Scattered guest records that converge into an orbit around the pearl: identity resolution. */
function DataSwarm({ reduced }) {
  const points = useRef();
  const { start, end, positions, colors } = useMemo(() => {
    const rand = random(42);
    const start = new Float32Array(PARTICLES * 3);
    const end = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    for (let i = 0; i < PARTICLES; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const far = 6 + rand() * 6;
      start[i * 3] = far * Math.sin(phi) * Math.cos(theta);
      start[i * 3 + 1] = far * Math.sin(phi) * Math.sin(theta);
      start[i * 3 + 2] = far * Math.cos(phi);

      const r = 1.6 + Math.pow(rand(), 1.6) * 2.4;
      const a = rand() * Math.PI * 2;
      end[i * 3] = r * Math.cos(a);
      end[i * 3 + 1] = (rand() - 0.5) * 0.35 * (r - 1.2);
      end[i * 3 + 2] = r * Math.sin(a);

      const c = COLORS[Math.floor(rand() * COLORS.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { start, end, positions: new Float32Array(reduced ? end : start), colors };
  }, [reduced]);
  const texture = useMemo(dotTexture, []);
  const progress = useRef(reduced ? 1 : 0);

  useFrame((_, delta) => {
    const geo = points.current.geometry;
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / 2.8);
      const p = easeOutCubic(progress.current);
      const arr = geo.attributes.position.array;
      for (let i = 0; i < arr.length; i++) arr[i] = start[i] + (end[i] - start[i]) * p;
      geo.attributes.position.needsUpdate = true;
    }
    points.current.rotation.y += delta * (reduced ? 0.02 : 0.08);
  });

  return (
    <points ref={points} rotation={[0.42, 0, 0.12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.055}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Data sources (PMS, spa, OTA…) as glowing satellites on tilted rings. */
function Satellites({ reduced }) {
  const refs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (reduced ? 0.2 : 1);
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = SOURCES[i];
      const a = t * s.speed + i * 2.1;
      mesh.position.set(Math.cos(a) * s.radius, 0, Math.sin(a) * s.radius);
    });
  });
  return SOURCES.map((s, i) => (
    <group key={i} rotation={[Math.PI / 2 + s.tilt, 0, s.tilt * 0.6]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[s.radius, 0.004, 8, 160]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.22} />
      </mesh>
      <mesh ref={(el) => (refs.current[i] = el)}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color={s.color} toneMapped={false} />
      </mesh>
    </group>
  ));
}

function Pearl() {
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh>
        <sphereGeometry args={[1.15, 128, 128]} />
        <meshPhysicalMaterial
          color="#eef2ff"
          roughness={0.16}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[180, 820]}
          sheen={1}
          sheenColor="#a5b4fc"
        />
      </mesh>
    </Float>
  );
}

/** Follows the pointer a little and drifts back as the page scrolls past the hero. */
function Rig({ children, reduced }) {
  const group = useRef();
  useFrame(({ pointer, camera }, delta) => {
    const k = 1 - Math.exp(-delta * 3);
    if (!reduced) {
      group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * k;
      group.current.rotation.x += (-pointer.y * 0.2 - group.current.rotation.x) * k;
    }
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    camera.position.z += (6.2 + scroll * 3 - camera.position.z) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function PearlScene({ active = true }) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#c7d2fe" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#10b981" />
      <Rig reduced={reduced}>
        <Pearl />
        <DataSwarm reduced={reduced} />
        <Satellites reduced={reduced} />
      </Rig>
      {/* Studio lighting built in place: no HDR download. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#c7d2fe" position={[0, 4, -6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#6ee7b7" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#818cf8" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={4} color="#ffffff" position={[2, 3, 5]} scale={2} />
      </Environment>
    </Canvas>
  );
}
