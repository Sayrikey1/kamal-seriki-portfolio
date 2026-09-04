"use client";

import Image from "next/image";
import {
  useCallback,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";

import { profile } from "@/data/profile";
import { links } from "@/data/links";
import { ActionButton } from "@/components/ui/action-button";
import { ResumeButton } from "@/components/ui/resume-button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline figures, verified against the CV and the public GitHub profile.
 * Kept as literal strings — "companies" is not the same count as roles, so
 * deriving these from the data modules would quietly change their meaning.
 */
const stats = [
  { value: "5+", label: "Years experience" },
  { value: "6", label: "Companies shipped for" },
  { value: "3", label: "Peer-reviewed papers" },
  { value: "77", label: "Public repositories" },
];

interface RiseProps {
  children: ReactNode;
  /** Seconds of entrance stagger. */
  delay?: number;
  className?: string;
}

/**
 * Mount entrance — above the fold, so it must not wait on a scroll trigger.
 * Reduced motion is suppressed globally by MotionConfig reducedMotion="user";
 * branching these values on a hook would break hydration.
 */
function Rise({ children, delay = 0, className }: RiseProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  // Pointer parallax. The motion values drive the photo and the glow behind it,
  // never the frosted frame itself — transforming a backdrop-filter surface is
  // what makes glass stutter.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 80, damping: 20, mass: 0.7 });
  const driftY = useSpring(pointerY, { stiffness: 80, damping: 20, mass: 0.7 });
  const photoX = useTransform(driftX, [-1, 1], [9, -9]);
  const photoY = useTransform(driftY, [-1, 1], [9, -9]);
  const glowX = useTransform(driftX, [-1, 1], [-24, 24]);
  const glowY = useTransform(driftY, [-1, 1], [-18, 18]);

  const trackPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Checked at event time, not render time — reading the media query
      // during render is what desynchronises hydration.
      if (event.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [pointerX, pointerY],
  );

  const releasePointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const [firstName, ...restOfName] = profile.name.split(" ");
  const surname = restOfName.join(" ");

  return (
    <section
      id="hero"
      className="scroll-anchor relative flex min-h-svh items-center overflow-hidden pt-32 pb-24 sm:pt-36 sm:pb-28"
    >
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* ── Copy ──────────────────────────────────────────────────────── */}
          <div className="max-w-xl">
            <Rise>
              <span className="glass-1 text-fg-muted inline-flex items-center gap-2.5 py-1.5 pr-4 pl-3 font-mono text-[11px] tracking-tight sm:text-xs">
                <span
                  aria-hidden
                  className="relative flex h-1.5 w-1.5 shrink-0"
                >
                  <span className="bg-accent absolute inset-0 rounded-full opacity-75 motion-safe:animate-ping" />
                  <span className="bg-accent relative h-1.5 w-1.5 rounded-full" />
                </span>
                Available for senior AI &amp; backend roles
              </span>
            </Rise>

            <Rise delay={0.08} className="mt-6 sm:mt-7">
              <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                <span className="block">{firstName}</span>
                {surname ? (
                  <span className="text-gradient block pb-[0.06em]">
                    {surname}
                  </span>
                ) : null}
              </h1>
            </Rise>

            <Rise delay={0.16} className="mt-5 sm:mt-6">
              <p className="font-display text-fg text-xl font-medium tracking-tight sm:text-2xl">
                {profile.title}
              </p>
              <p className="text-fg-muted mt-4 max-w-lg text-[15px] leading-relaxed sm:text-lg">
                {profile.strapline}
              </p>
            </Rise>

            <Rise delay={0.24} className="mt-7">
              <p className="text-fg-subtle inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
                <MapPin
                  aria-hidden
                  strokeWidth={1.8}
                  className="text-accent-3 h-3.5 w-3.5 shrink-0"
                />
                {profile.location}
              </p>
            </Rise>

            <Rise
              delay={0.32}
              className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10"
            >
              <ActionButton href="#projects">View selected work</ActionButton>
              <ActionButton href="#contact" variant="ghost">
                Get in touch
              </ActionButton>
              <ResumeButton />
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.shortName} on GitHub`}
                className="glass-1 text-fg-muted hover:text-fg grid h-11 w-11 shrink-0 place-items-center transition-colors"
              >
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
            </Rise>
          </div>

          {/* ── Portrait ──────────────────────────────────────────────────── */}
          <motion.div
            onPointerMove={trackPointer}
            onPointerLeave={releasePointer}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: EASE,
            }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:mr-0 lg:max-w-[440px]"
          >
            <motion.span
              aria-hidden
              style={{ x: glowX, y: glowY }}
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(42%_42%_at_32%_26%,var(--glow-1),transparent_72%),radial-gradient(46%_46%_at_74%_78%,var(--glow-2),transparent_72%)]"
            />

            <GlassPanel
              tier={3}
              sheen
              edge
              refract
              as="figure"
              className="m-0 p-3"
            >
              <div className="bg-bg-deep relative aspect-square overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute inset-0"
                  style={{ x: photoX, y: photoY }}
                >
                  <Image
                    src={profile.headshot.src}
                    alt={profile.headshot.alt}
                    // The source file is 460x460; declaring its true intrinsic
                    // size stops the optimiser being asked to upscale.
                    width={460}
                    height={460}
                    preload
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 84vw"
                    className="h-full w-full scale-[1.07] object-cover"
                  />
                </motion.div>
                {/* Specular wash so the photo reads as though it sits under glass. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(152deg,color-mix(in_oklab,var(--glass-edge-top)_38%,transparent),transparent_46%)]"
                />
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        {/* ── Stat rail ───────────────────────────────────────────────────── */}
        <Rise delay={0.44} className="mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "border-edge flex flex-col gap-2 border-t pt-4 pr-4 sm:pt-5 sm:pr-6",
                  index > 0 && "sm:border-edge sm:border-l sm:pl-6",
                )}
              >
                <dt className="text-fg-subtle font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase">
                  {stat.label}
                </dt>
                <dd className="text-fg order-first font-mono text-3xl leading-none font-medium tabular-nums sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 [@media(max-height:820px)]:hidden"
      >
        <span className="text-fg-subtle font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.span
          className="text-fg-subtle"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.6} />
        </motion.span>
      </motion.div>
    </section>
  );
}
