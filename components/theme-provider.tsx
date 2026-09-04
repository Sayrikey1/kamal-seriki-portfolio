"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Dark-first, class-based theming. next-themes injects a pre-hydration script
 * so there is no flash of the wrong theme on first paint.
 *
 * MotionConfig with reducedMotion="user" is the hydration-safe way to honour
 * prefers-reduced-motion: motion suppresses transform and layout animations
 * inside the animation layer, at animation time. Branching on
 * useReducedMotion() during render cannot work here — it reads the media query
 * synchronously on the first client render, so the server HTML (which has no
 * media query) and the client tree disagree, and hydration fails for exactly
 * the users the branch was meant to help. Opacity still animates, which gives
 * the intended "fade instead of move" fallback.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
