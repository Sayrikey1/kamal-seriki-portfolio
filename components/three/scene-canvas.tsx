"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GlassObject } from "@/components/three/glass-object";

interface SceneCanvasProps {
  lowPower: boolean;
  /** Feeds the environment map the glass refracts. */
  theme?: "light" | "dark";
  /** Called on WebGL context loss so the caller can fall back to the poster. */
  onContextLost?: () => void;
}

/** Default export: loaded through next/dynamic with ssr disabled. */
export default function SceneCanvas({
  lowPower,
  theme = "dark",
  onContextLost,
}: SceneCanvasProps) {
  const [running, setRunning] = useState(true);

  // Battery, not just framerate — stop rendering for a backgrounded tab.
  useEffect(() => {
    const onVisibilityChange = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      // Equivalent to setPixelRatio(min(devicePixelRatio, 2)) — the single
      // highest-leverage perf fix on retina displays.
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <Suspense fallback={null}>
        <GlassObject lowPower={lowPower} theme={theme} />
      </Suspense>
    </Canvas>
  );
}
