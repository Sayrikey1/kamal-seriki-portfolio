"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSpecular } from "@/lib/use-specular";

interface ActionButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}

/**
 * Primary call to action. Scale-on-hover only — no transform on a blurred
 * surface during scroll, which is where glass jank comes from.
 *
 * The hover/tap scales are unconditional: MotionConfig reducedMotion="user"
 * suppresses them for visitors who ask for reduced motion, without a
 * render-time branch that would break hydration.
 */
export function ActionButton({
  children,
  href,
  variant = "primary",
  external = false,
  className,
}: ActionButtonProps) {
  const specular = useSpecular<HTMLAnchorElement>();

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      {...specular}
      className={cn(
        "glass-sheen relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors",
        variant === "primary" && [
          "text-accent-fg",
          "bg-[linear-gradient(110deg,var(--accent),var(--accent-2))]",
          "shadow-[0_10px_36px_-8px_color-mix(in_oklab,var(--accent)_65%,transparent)]",
        ],
        variant === "ghost" &&
          "glass-1 text-fg hover:text-accent !rounded-full",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
