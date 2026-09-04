"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { ErrorBoundary } from "@/components/error-boundary";
import { useDeviceCapability } from "@/lib/use-device-capability";

// three.js + drei is a large chunk; keep it out of the initial payload and off
// the server entirely.
const SceneCanvas = dynamic(() => import("@/components/three/scene-canvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * The one persistent WebGL surface for the whole page.
 *
 * Mounted once in the layout — never per section, because mobile browsers cap
 * concurrent WebGL contexts and spawning one per section risks a crash. The
 * ambient gradient underneath always renders, so incapable devices, reduced
 * motion, and context loss all land somewhere deliberate.
 */
export function SceneBackdrop() {
  const { resolved, canRender3D, lowPower } = useDeviceCapability();
  const { resolvedTheme } = useTheme();
  const [failed, setFailed] = useState(false);
  const [idle, setIdle] = useState(false);
  const theme = resolvedTheme === "light" ? "light" : "dark";

  // Don't let the three.js chunk compete with the hero's first paint (LCP).
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setIdle(true), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(() => setIdle(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const show3D = resolved && canRender3D && idle && !failed;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Ambient colour field. Always present: it is the base of the palette in
          both themes and the graceful fallback when 3D is off. */}
      <div className="bg-bg absolute inset-0" />
      <div
        className="motion-safe:animate-pan absolute top-[-10%] -left-[15%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-1), transparent 70%)",
        }}
      />
      <div
        className="motion-safe:animate-float absolute top-[25%] -right-[10%] h-[45vmax] w-[45vmax] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-2), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] h-[50vmax] w-[50vmax] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-3), transparent 70%)",
        }}
      />
      <div className="grid-bg absolute inset-0" />
      <span className="noise" />

      {show3D ? (
        // Held below full opacity so the object can never win a contrast fight
        // with body copy that scrolls past it. Light mode needs more restraint:
        // dark refracted glass on a pale ground is the worst case.
        <div className="absolute inset-0 opacity-70 dark:opacity-90">
          <ErrorBoundary onError={() => setFailed(true)}>
            <SceneCanvas
              lowPower={lowPower}
              theme={theme}
              onContextLost={() => setFailed(true)}
            />
          </ErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
