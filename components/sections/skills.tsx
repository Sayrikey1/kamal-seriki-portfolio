import {
  Blocks,
  Brain,
  Plug,
  Server,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ChipRail } from "@/components/ui/chip";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types/content";

interface GroupLayout {
  icon: LucideIcon;
  /** Explicit grid spans. lg is a 6-col grid: 3 + 3, then 2 + 2 + 2. */
  span: string;
  /** One card carries the extra weight so the grid has a clear entry point. */
  featured: boolean;
}

/**
 * Keyed by icon name rather than array index, so the deliberate spans stay
 * attached to their group even if the data is reordered.
 */
const GROUP_LAYOUT: Record<SkillGroup["icon"], GroupLayout> = {
  brain: {
    icon: Brain,
    span: "sm:col-span-2 lg:col-span-3",
    featured: true,
  },
  server: { icon: Server, span: "lg:col-span-3", featured: false },
  blocks: { icon: Blocks, span: "lg:col-span-2", featured: false },
  target: { icon: Target, span: "lg:col-span-2", featured: false },
  plug: { icon: Plug, span: "lg:col-span-2", featured: false },
};

/** Diagonal accent wash, only on the featured card. */
const FEATURED_WASH =
  "radial-gradient(130% 115% at 0% 0%, color-mix(in oklab, var(--accent) 20%, transparent) 0%, color-mix(in oklab, var(--accent-2) 10%, transparent) 44%, transparent 74%)";

const FEATURED_ICON_TINT =
  "linear-gradient(140deg, color-mix(in oklab, var(--accent) 32%, transparent), color-mix(in oklab, var(--accent-2) 20%, transparent))";

const ICON_TINT = "color-mix(in oklab, var(--accent) 16%, transparent)";

/** 8 -> "08" */
function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="02 — Capabilities"
        title={
          <>
            Model design through to{" "}
            <span className="text-gradient">production infrastructure</span>
          </>
        }
        lead="Five areas I work in daily — the modelling at one end, the infrastructure that has to keep it standing at the other, and the payment and platform plumbing in between."
      />

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
        {skillGroups.map((group, index) => {
          const { icon: Icon, span, featured } = GROUP_LAYOUT[group.icon];

          return (
            <li key={group.title} className={cn("min-w-0", span)}>
              <Reveal delay={index * 0.06} className="h-full">
                {/* The lift writes the `transform` property (not Tailwind v4's
                    `translate`) so the transition already on .glass-2 eases it,
                    without overriding its colour/shadow transitions. */}
                <GlassPanel
                  tier={2}
                  sheen
                  edge
                  hover
                  className="h-full hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  {featured ? (
                    <>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{ background: FEATURED_WASH }}
                      />
                      <span className="noise" />
                    </>
                  ) : null}

                  <div
                    className={cn(
                      "relative flex flex-col gap-5",
                      featured ? "p-6 sm:p-8" : "p-6 sm:p-7",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden
                        className={cn(
                          "inline-flex shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_oklab,var(--accent)_26%,transparent)]",
                          featured ? "h-14 w-14" : "h-11 w-11",
                        )}
                        style={{
                          background: featured ? FEATURED_ICON_TINT : ICON_TINT,
                        }}
                      >
                        <Icon
                          className={cn(
                            "text-accent",
                            featured ? "h-7 w-7" : "h-5 w-5",
                          )}
                          strokeWidth={1.5}
                        />
                      </span>

                      <span
                        aria-hidden
                        className={cn(
                          "text-fg-subtle font-mono leading-none opacity-40",
                          featured ? "text-base" : "text-sm",
                        )}
                      >
                        {pad(index + 1)}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3
                        className={cn(
                          "font-display leading-tight font-semibold",
                          featured ? "text-xl sm:text-2xl" : "text-lg",
                        )}
                      >
                        {group.title}
                      </h3>
                      <p className="text-fg-subtle font-mono text-[10px] tracking-[0.2em] uppercase">
                        {pad(group.skills.length)} skills
                      </p>
                    </div>

                    <span aria-hidden className="rule block" />

                    <ChipRail
                      items={group.skills}
                      size={featured ? "md" : "sm"}
                      className="min-w-0"
                    />
                  </div>
                </GlassPanel>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
