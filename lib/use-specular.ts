"use client";

import { useCallback } from "react";

/**
 * Cursor-tracked specular glint for glass surfaces.
 *
 * Writes --mx/--my as CSS custom properties straight onto the node, so the
 * highlight follows the pointer without triggering a React render per move.
 * Pair with the `glass-sheen` class.
 */
export function useSpecular<T extends HTMLElement = HTMLDivElement>() {
  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--mx", `${x}%`);
    element.style.setProperty("--my", `${y}%`);
  }, []);

  const onPointerLeave = useCallback((event: React.PointerEvent<T>) => {
    const element = event.currentTarget;
    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "0%");
  }, []);

  return { onPointerMove, onPointerLeave };
}
