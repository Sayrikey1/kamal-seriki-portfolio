"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSpecular } from "@/lib/use-specular";

/** Container elements the panel is allowed to render as. */
type PanelElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "li"
  | "header"
  | "footer"
  | "figure";

interface GlassPanelProps {
  children: ReactNode;
  /** 1 = chip/control, 2 = card (default), 3 = nav / hero / prominent. */
  tier?: 1 | 2 | 3;
  /** Cursor-tracked specular highlight. */
  sheen?: boolean;
  /** Top-edge light catch. */
  edge?: boolean;
  /** Tier-1 SVG refraction layer. Desktop + pointer only, use sparingly. */
  refract?: boolean;
  /** Lift and brighten on hover. */
  hover?: boolean;
  as?: PanelElement;
  className?: string;
  /**
   * Classes for the inner content wrapper. Use this when the panel's children
   * need to fill its height (e.g. pinning a card footer to the bottom) rather
   * than reaching through to the wrapper with a child selector.
   */
  contentClassName?: string;
}

/**
 * The workhorse glass surface. Tiers map to the recipes in globals.css.
 *
 * Keep `refract` to at most three elements on a page — the SVG displacement
 * filter is not reliably GPU-composited.
 */
export function GlassPanel({
  children,
  tier = 2,
  sheen = false,
  edge = false,
  refract = false,
  hover = false,
  as,
  className,
  contentClassName,
}: GlassPanelProps) {
  const Component = as ?? "div";
  const specular = useSpecular<HTMLDivElement>();
  const pointerHandlers = sheen ? specular : {};

  return (
    <Component
      className={cn(
        tier === 1 && "glass-1",
        tier === 2 && "glass-2",
        tier === 3 && "glass-3",
        sheen && "glass-sheen",
        edge && "glass-edge",
        refract && "glass-refract",
        hover && "glass-hover",
        "overflow-hidden",
        className,
      )}
      {...pointerHandlers}
    >
      {refract ? <span aria-hidden className="refract-layer" /> : null}
      <div className={cn("relative z-[1]", contentClassName)}>{children}</div>
    </Component>
  );
}

/** The SVG displacement filter behind `refract`. Rendered once, in the layout. */
export function GlassFilterDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <filter
        id="liquid-glass-refract"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.014"
          numOctaves={2}
          seed={11}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2.4" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="26"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
