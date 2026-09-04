"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-state";

/**
 * Scroll poses for the single motif: [scrollProgress, x, y, scale].
 *
 * The object is deliberately kept out of the centre-left, where every section's
 * copy lives — a refracting body behind body text destroys legibility,
 * especially in light mode. It rides the right edge, crosses left through a
 * card-heavy stretch, and returns to centre only at contact, where the copy
 * sits on a dense tier-3 panel that can carry it.
 */
const POSES: [number, number, number, number][] = [
  [0.0, 2.55, 0.45, 0.72],
  [0.2, 3.1, 0.1, 0.5],
  [0.45, -2.9, -0.25, 0.44],
  [0.72, 3.0, 0.2, 0.5],
  [1.0, 0.0, 0.0, 0.78],
];

function samplePose(progress: number) {
  let lower = POSES[0]!;
  let upper = POSES[POSES.length - 1]!;

  for (let i = 0; i < POSES.length - 1; i += 1) {
    const current = POSES[i]!;
    const next = POSES[i + 1]!;
    if (progress >= current[0] && progress <= next[0]) {
      lower = current;
      upper = next;
      break;
    }
  }

  const span = upper[0] - lower[0];
  const t = span === 0 ? 0 : (progress - lower[0]) / span;
  // smoothstep so pose changes ease rather than move linearly
  const eased = t * t * (3 - 2 * t);

  return {
    x: THREE.MathUtils.lerp(lower[1], upper[1], eased),
    y: THREE.MathUtils.lerp(lower[2], upper[2], eased),
    scale: THREE.MathUtils.lerp(lower[3], upper[3], eased),
  };
}

interface GlassObjectProps {
  /** Reduce geometry detail and transmission samples. */
  lowPower?: boolean;
  /** Drives the environment map, which is what the glass actually refracts. */
  theme?: "light" | "dark";
}

export function GlassObject({
  lowPower = false,
  theme = "dark",
}: GlassObjectProps) {
  const isLight = theme === "light";
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const detail = lowPower ? 1 : 3;

  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.35, detail),
    [detail],
  );

  const wireGeometry = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.62, 1)),
    [],
  );

  const pointsGeometry = useMemo(() => {
    const count = lowPower ? 180 : 520;
    const positions = new Float32Array(count * 3);
    // Deterministic distribution — a golden-angle spiral on a shell, so the
    // field looks organised rather than noisy, and never changes between loads.
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const shell = 2.6 + ((i * 37) % 11) * 0.14;
      positions[i * 3] = Math.cos(theta) * radius * shell;
      positions[i * 3 + 1] = y * shell * 0.75;
      positions[i * 3 + 2] = Math.sin(theta) * radius * shell;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [lowPower]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const pose = samplePose(scrollState.progress);
    const step = Math.min(1, delta * 2.2);

    group.position.x = THREE.MathUtils.lerp(group.position.x, pose.x, step);
    group.position.y = THREE.MathUtils.lerp(group.position.y, pose.y, step);

    const targetScale = pose.scale;
    const current = group.scale.x;
    const next = THREE.MathUtils.lerp(current, targetScale, step);
    group.scale.setScalar(next);

    // Cursor tilt, damped so it feels weighted rather than twitchy.
    const targetRotX = scrollState.pointerY * 0.28;
    const targetRotY = scrollState.pointerX * 0.42;
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      targetRotX,
      delta * 1.6,
    );

    // Continuous spin, nudged by scroll velocity.
    const spin = delta * (0.14 + Math.abs(scrollState.velocity) * 0.5);
    if (meshRef.current) {
      meshRef.current.rotation.y += spin;
      meshRef.current.rotation.x += spin * 0.28;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= spin * 0.65;
      wireRef.current.rotation.z += spin * 0.2;
    }

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      targetRotY + state.clock.elapsedTime * 0.04,
      delta * 1.4,
    );
  });

  return (
    <>
      {/* Procedural environment — no external HDR fetch, so nothing to block.
          The background colour here is the single most important value in this
          file: transmission refracts the environment map, so a near-black
          background turns the "glass" into an opaque dark mass. Both themes get
          a lifted ground so the body always reads as clear and luminous.
          Keyed on theme so the cubemap re-bakes when the theme flips. */}
      <Environment key={theme} resolution={lowPower ? 128 : 256} frames={1}>
        <color attach="background" args={[isLight ? "#e8edfa" : "#1e2740"]} />
        <Lightformer
          form="rect"
          intensity={isLight ? 2.2 : 3.2}
          color="#5b8cff"
          position={[-4, 2, 4]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={isLight ? 1.8 : 2.4}
          color="#a575ff"
          position={[4, -1, 3]}
          scale={[7, 7, 1]}
        />
        <Lightformer
          form="circle"
          intensity={isLight ? 2.0 : 2.8}
          color="#38e0cf"
          position={[0, 4, -3]}
          scale={[5, 5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={isLight ? 3.4 : 1.9}
          color="#ffffff"
          position={[0, -4, 2]}
          scale={[10, 4, 1]}
        />
      </Environment>

      <ambientLight intensity={isLight ? 0.8 : 0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />

      <group ref={groupRef}>
        {/* Tier 2 liquid glass: real refraction through the geometry. */}
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            samples={lowPower ? 3 : 6}
            resolution={lowPower ? 128 : 256}
            // Thinner body + lower IOR keeps it reading as a light-bending
            // shell rather than a solid lens.
            thickness={isLight ? 0.5 : 0.7}
            roughness={0.12}
            anisotropicBlur={0.35}
            chromaticAberration={0.22}
            distortion={0.3}
            distortionScale={0.35}
            temporalDistortion={0.08}
            ior={1.3}
            color={isLight ? "#f2f6ff" : "#dfe8ff"}
            attenuationDistance={4}
            attenuationColor={isLight ? "#ffffff" : "#b9ccff"}
            backside={false}
          />
        </mesh>

        {/* Lattice overlay — the "structured system" read. */}
        <lineSegments ref={wireRef} geometry={wireGeometry}>
          <lineBasicMaterial
            color="#7aa2ff"
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </lineSegments>

        <points geometry={pointsGeometry}>
          <pointsMaterial
            size={0.028}
            color="#9fc0ff"
            transparent
            opacity={0.55}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
