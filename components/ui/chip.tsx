import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: ReactNode;
  /** Tint the chip with an accent instead of neutral glass. */
  tone?: "neutral" | "accent";
  size?: "sm" | "md";
  className?: string;
}

/** Text-only tech badge. Deliberately no third-party brand logos. */
export function Chip({
  children,
  tone = "neutral",
  size = "sm",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "glass-1 inline-flex items-center font-mono tracking-wider whitespace-nowrap uppercase",
        size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        tone === "neutral" && "text-fg-muted",
        tone === "accent" && "text-accent border-transparent",
        tone === "accent" &&
          "[background-color:color-mix(in_oklab,var(--accent)_14%,transparent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface ChipRailProps {
  items: string[];
  tone?: "neutral" | "accent";
  size?: "sm" | "md";
  className?: string;
}

/** A wrapped row of chips. */
export function ChipRail({
  items,
  tone = "neutral",
  size = "sm",
  className,
}: ChipRailProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Chip key={item} tone={tone} size={size}>
          {item}
        </Chip>
      ))}
    </div>
  );
}
