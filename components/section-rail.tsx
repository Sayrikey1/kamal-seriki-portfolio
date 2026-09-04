"use client";

import { useCallback, useEffect, useState } from "react";
import { sections } from "@/data/links";
import { cn } from "@/lib/utils";

/**
 * Peripheral wayfinding rail: one hairline mark per section, pinned to the
 * right edge on wide viewports only.
 *
 * Deliberately not a scroll listener. A single IntersectionObserver with a
 * symmetric -45% root margin resolves "which section owns the middle of the
 * viewport" for free, which is the same contract SiteNav uses — the two stay in
 * agreement because they observe the same elements with the same margin.
 *
 * The initial active id is a constant, so the server HTML and the first client
 * render match; the observer corrects it from its callback after mount (never a
 * synchronous setState in the effect body).
 */
export function SectionRail() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  // Event handler, so matchMedia is safe to read here — see the render-time ban.
  const goTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    element.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 xl:flex"
    >
      <ul className="relative flex flex-col items-end gap-5">
        {/* Faint spine the marks hang off — keeps the group reading as one object. */}
        <span
          aria-hidden
          className="absolute inset-y-1 right-0 w-px bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--fg)_14%,transparent)_18%,color-mix(in_oklab,var(--fg)_14%,transparent)_82%,transparent)]"
        />

        {sections.map((section) => {
          const isActive = active === section.id;

          return (
            <li key={section.id} className="flex">
              <button
                type="button"
                onClick={() => goTo(section.id)}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-4 w-9 items-center justify-end rounded-full"
              >
                {/* Label sits to the LEFT of the rail so it can never overflow
                    the viewport edge. Revealed by hover and by keyboard focus —
                    group-focus-visible resolves against this same button. */}
                <span
                  className={cn(
                    "glass-1 text-fg-muted pointer-events-none absolute right-full mr-3 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] whitespace-nowrap uppercase",
                    "translate-x-1 opacity-0 motion-safe:transition-[opacity,translate] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "group-hover:translate-x-0 group-hover:opacity-100",
                    "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  {section.label}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "block rounded-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "bg-accent h-[1.5px] w-7"
                      : "bg-edge-strong h-px w-3 group-hover:w-5 group-hover:bg-[color-mix(in_oklab,var(--fg)_45%,transparent)]",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
