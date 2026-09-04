"use client";

import { useEffect, useState } from "react";

export interface DeviceCapability {
  /** False during SSR and first paint — never gate layout on this. */
  resolved: boolean;
  /** Mount the WebGL canvas at all? */
  canRender3D: boolean;
  /** Drop geometry detail and effect samples. */
  lowPower: boolean;
  reducedMotion: boolean;
}

const INITIAL: DeviceCapability = {
  resolved: false,
  canRender3D: false,
  lowPower: true,
  reducedMotion: false,
};

interface NavigatorWithHints extends Navigator {
  /** Device Memory API — Chromium only, in GiB. */
  deviceMemory?: number;
}

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hard capability gates from the plan: no canvas below 768px, or with <= 4 GiB
 * device memory, or <= 4 logical cores, or when reduced motion is requested.
 * Those devices get the static poster instead.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(INITIAL);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wideQuery = window.matchMedia("(min-width: 768px)");
    const nav = navigator as NavigatorWithHints;

    const evaluate = () => {
      const reducedMotion = motionQuery.matches;
      const wideEnough = wideQuery.matches;
      const memory = nav.deviceMemory ?? 8;
      const cores = nav.hardwareConcurrency ?? 8;
      const lowPower = memory <= 4 || cores <= 4;

      setCapability({
        resolved: true,
        canRender3D: wideEnough && !lowPower && !reducedMotion && detectWebGL(),
        lowPower,
        reducedMotion,
      });
    };

    evaluate();
    motionQuery.addEventListener("change", evaluate);
    wideQuery.addEventListener("change", evaluate);
    return () => {
      motionQuery.removeEventListener("change", evaluate);
      wideQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return capability;
}

/** Standalone reduced-motion check for components that only need that gate. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
