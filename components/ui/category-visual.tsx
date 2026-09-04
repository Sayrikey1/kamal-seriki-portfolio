import {
  Brain,
  Layers,
  MessagesSquare,
  ScanEye,
  Server,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/content";

interface CategoryStyle {
  label: string;
  icon: LucideIcon;
  /** Tailwind gradient stops. */
  gradient: string;
  glow: string;
}

export const CATEGORY_STYLES: Record<ProjectCategory, CategoryStyle> = {
  "ai-ml": {
    label: "AI / ML",
    icon: Brain,
    gradient: "from-[#5b8cff]/70 via-[#a575ff]/40 to-transparent",
    glow: "rgba(91,140,255,0.45)",
  },
  nlp: {
    label: "NLP / RAG",
    icon: MessagesSquare,
    gradient: "from-[#38e0cf]/70 via-[#5b8cff]/40 to-transparent",
    glow: "rgba(56,224,207,0.4)",
  },
  "computer-vision": {
    label: "Computer Vision",
    icon: ScanEye,
    gradient: "from-[#4ade80]/60 via-[#38e0cf]/40 to-transparent",
    glow: "rgba(74,222,128,0.35)",
  },
  fullstack: {
    label: "Full Stack",
    icon: Layers,
    gradient: "from-[#a575ff]/70 via-[#ff7ab8]/35 to-transparent",
    glow: "rgba(165,117,255,0.4)",
  },
  backend: {
    label: "Backend",
    icon: Server,
    gradient: "from-[#6366f1]/65 via-[#38bdf8]/35 to-transparent",
    glow: "rgba(99,102,241,0.4)",
  },
};

interface CategoryVisualProps {
  category: ProjectCategory;
  /** Compact variant for the secondary grid. */
  compact?: boolean;
  className?: string;
}

/**
 * Abstract project art. Stands in until a real screenshot lands, and is built
 * from gradients plus one icon so it costs no image bytes.
 */
export function CategoryVisual({
  category,
  compact = false,
  className,
}: CategoryVisualProps) {
  const style = CATEGORY_STYLES[category];
  const Icon = style.icon;

  return (
    <div
      aria-hidden
      className={cn(
        "border-edge relative isolate overflow-hidden rounded-xl border",
        compact ? "h-24" : "h-44",
        className,
      )}
    >
      <div className="bg-bg-deep absolute inset-0" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-90",
          style.gradient,
        )}
      />
      {/* concentric rings, drawn in CSS rather than an asset */}
      <div
        className="absolute -top-10 -right-8 h-40 w-40 rounded-full border border-white/15"
        style={{ boxShadow: `0 0 60px ${style.glow}` }}
      />
      <div className="absolute top-8 -right-2 h-24 w-24 rounded-full border border-white/10" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <span className="noise" />
      <Icon
        className={cn(
          "absolute text-white/85",
          compact ? "bottom-3 left-3 h-6 w-6" : "bottom-5 left-5 h-9 w-9",
        )}
        strokeWidth={1.4}
      />
    </div>
  );
}
