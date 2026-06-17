/**
 * TechSphere.tsx — React Three Fiber 3D hero scene.
 *
 * Lazy-loaded via HeroCanvas3D.tsx — three.js / @react-three/fiber / @react-three/drei
 * never land in the main bundle and are not fetched on mobile, touch, or
 * prefers-reduced-motion devices.
 *
 * FONT STRATEGY — IMPORTANT:
 * Drei's <Text> uses troika-three-text which calls getFontsForString() from
 * unicode-font-resolver. That function fetches metadata from cdn.jsdelivr.net,
 * which is blocked by connect-src CSP in production.
 *
 * Solution: labels use THREE.CanvasTexture sprites instead. HTML5 Canvas 2D
 * draws text with fonts already loaded on the page (JetBrains Mono / system
 * mono fallback), converts to a GPU texture, and mounts on a <sprite> that
 * auto-billboards to the camera. Zero CDN calls. Zero CSP impact.
 */
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/* ─── Curated label set (8 max, atmospheric) ─────── */
const HERO_LABELS = ["C++", "DSA", "React", "TypeScript", "Node.js", "MongoDB", "SQL", "OOP"];

/** Fibonacci / golden-angle sphere distribution. */
function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
    );
  }
  return pts;
}

// Pre-computed — stable across renders, no randomness in hot path
const LABEL_POSITIONS = fibonacciSphere(HERO_LABELS.length, 1.55);
const LABEL_OPACITIES = HERO_LABELS.map((_, i) => 0.15 + (i / (HERO_LABELS.length - 1)) * 0.13);

/**
 * Builds a 256×64 CanvasTexture with the label text.
 * Uses HTML5 Canvas 2D — no network requests, no CDN, no CSP concerns.
 * Fonts fall back gracefully: JetBrains Mono → Courier New → system monospace.
 */
function makeLabelTexture(label: string): THREE.CanvasTexture {
  const W = 256;
  const H = 64;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.font = `300 22px "JetBrains Mono", "Courier New", monospace`;
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, W / 2, H / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── Tech Label (Sprite + CanvasTexture) ─────────── */
function TechLabel({
  position,
  label,
  opacity,
}: {
  position: THREE.Vector3;
  label: string;
  opacity: number;
}) {
  // useMemo — texture built once per label, never rebuilt during animation
  const texture = useMemo(() => makeLabelTexture(label), [label]);

  // W:H ratio of the canvas (256:64 = 4:1); scale to readable world size
  // at sphere radius 1.55 with camera at z=4.2, fov=48
  return (
    <sprite position={position} scale={[0.68, 0.17, 1]} frustumCulled={false}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        sizeAttenuation
      />
    </sprite>
  );
}

/* ─── Wireframe Sphere ───────────────────────────── */
function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.06;
    ref.current.rotation.x += dt * 0.018;
  });
  return (
    <mesh ref={ref} frustumCulled={false}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="white" wireframe opacity={0.05} transparent />
    </mesh>
  );
}

/* ─── Ambient particle cloud ──────────────────────── */
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 55;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.1;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.014;
  });

  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      <pointsMaterial color="white" size={0.014} transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

/* ─── Mouse parallax rig ──────────────────────────── */
function SceneRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.current.y * 0.1 - ref.current.rotation.x) * dt * 2;
    ref.current.rotation.y += (mouse.current.x * 0.15 - ref.current.rotation.y) * dt * 2;
  });

  return <group ref={ref}>{children}</group>;
}

/* ─── Scene inner (logged for diagnostics) ───────── */
function Scene() {
  useEffect(() => {
    console.log("[TechSphere] Scene mounted — R3F scene graph active");
  }, []);

  return (
    <SceneRig>
      <Sphere />
      {HERO_LABELS.map((label, i) => (
        <TechLabel
          key={label}
          label={label}
          position={LABEL_POSITIONS[i]}
          opacity={LABEL_OPACITIES[i]}
        />
      ))}
      <ParticleCloud />
    </SceneRig>
  );
}

/* ─── Root Canvas ─────────────────────────────────── */
export default function TechSphere() {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, 1.5));

  useEffect(() => {
    console.log("[TechSphere] Canvas component mounted, dpr:", dpr);
  }, [dpr]);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 48 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        console.log("[TechSphere] WebGL context created:", gl.getContext());
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(0.8)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.5))}
        flipflops={3}
        iterations={10}
        threshold={0.9}
        factor={1}
      />
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#ffffff" />
      <Scene />
    </Canvas>
  );
}
