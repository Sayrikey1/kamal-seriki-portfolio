"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Seconds. Stagger siblings with index * 0.06 or similar. */
  delay?: number;
  /** Travel distance in px. Set 0 for opacity-only. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance. Animates transform/opacity only.
 *
 * Reduced motion is handled globally by MotionConfig reducedMotion="user" in
 * the provider tree, which drops the y translation and keeps the fade. Do not
 * branch these props on useReducedMotion() — that reads the media query during
 * the first client render and breaks hydration.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
