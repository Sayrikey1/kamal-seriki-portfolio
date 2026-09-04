"use client";

import { useEffect, useRef } from "react";
import { sections } from "@/data/links";
import { scrollState } from "@/lib/scroll-state";
import { ensureGsap } from "@/lib/scroll-timeline";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Single source of scroll truth.
 *
 * One ScrollTrigger writes document progress, velocity and active section into
 * the `scrollState` singleton, which the R3F loop samples each frame. Nothing
 * here sets React state, so scrolling costs no re-renders.
 */
export function ScrollDriver() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();

    const progressTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        scrollState.velocity = clamp(self.getVelocity() / 2600, -1, 1);
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    const sectionTriggers = sections
      .map((section, index) => {
        const element = document.getElementById(section.id);
        if (!element) return null;
        return ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) scrollState.sectionIndex = index;
          },
        });
      })
      .filter(Boolean);

    const onPointerMove = (event: PointerEvent) => {
      scrollState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      progressTrigger.kill();
      for (const trigger of sectionTriggers) trigger?.kill();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
      />
    </div>
  );
}
