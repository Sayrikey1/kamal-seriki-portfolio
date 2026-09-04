"use client";

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { resume } from "@/data/links";
import { cn } from "@/lib/utils";
import { useSpecular } from "@/lib/use-specular";

interface ResumeButtonProps {
  /** "solid" for a primary CTA, "ghost" to sit beside one. */
  variant?: "solid" | "ghost";
  /** Append the file size, for contexts with room for it. */
  showSize?: boolean;
  className?: string;
}

/**
 * Download control for the CV.
 *
 * The `download` attribute makes the browser save the file rather than opening
 * a PDF viewer, and names it after Kamal rather than the URL slug. Scale on
 * hover is unconditional — MotionConfig reducedMotion="user" suppresses it for
 * visitors who ask for reduced motion, without a render-time branch.
 */
export function ResumeButton({
  variant = "ghost",
  showSize = false,
  className,
}: ResumeButtonProps) {
  const specular = useSpecular<HTMLAnchorElement>();

  return (
    <motion.a
      href={resume.href}
      download={resume.filename}
      aria-label={`Download résumé as PDF, ${resume.sizeLabel}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      {...specular}
      className={cn(
        "glass-sheen relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors",
        variant === "solid" && [
          "text-accent-fg",
          "bg-[linear-gradient(110deg,var(--accent),var(--accent-2))]",
          "shadow-[0_10px_36px_-8px_color-mix(in_oklab,var(--accent)_65%,transparent)]",
        ],
        variant === "ghost" &&
          "glass-1 text-fg hover:text-accent !rounded-full",
        className,
      )}
    >
      <Download aria-hidden className="size-4 shrink-0" strokeWidth={1.9} />
      Résumé
      {showSize ? (
        <span className="text-fg-subtle font-mono text-[10px] tracking-wider">
          PDF · {resume.sizeLabel}
        </span>
      ) : null}
    </motion.a>
  );
}
