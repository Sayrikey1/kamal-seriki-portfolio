import { cn, hashIndex, monogram } from "@/lib/utils";

/** Fixed palette — a company name always hashes to the same pair. */
const GRADIENTS = [
  "from-[#5b8cff] to-[#a575ff]",
  "from-[#38e0cf] to-[#5b8cff]",
  "from-[#a575ff] to-[#ff7ab8]",
  "from-[#ffb457] to-[#ff6b6b]",
  "from-[#38e0cf] to-[#4ade80]",
  "from-[#6366f1] to-[#38bdf8]",
];

interface MonogramProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Stands in for a company logo. Deterministic, so it stays stable across
 * renders and reads as designed rather than as a missing asset.
 */
export function Monogram({ name, size = "md", className }: MonogramProps) {
  const gradient = GRADIENTS[hashIndex(name, GRADIENTS.length)];

  return (
    <span
      aria-hidden
      className={cn(
        "font-display inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-semibold text-white shadow-lg",
        gradient,
        size === "sm" && "h-8 w-8 text-[11px]",
        size === "md" && "h-11 w-11 text-sm",
        size === "lg" && "h-14 w-14 text-base",
        className,
      )}
    >
      {monogram(name)}
    </span>
  );
}
