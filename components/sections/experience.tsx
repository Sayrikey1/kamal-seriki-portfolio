"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MapPin, Minus, Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Chip, ChipRail } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Monogram } from "@/components/ui/monogram";
import { workExperience } from "@/data/work-experience";
import { ensureGsap } from "@/lib/scroll-timeline";
import { cn, formatDateRange, formatMonth } from "@/lib/utils";

/** Highlights shown before the "+N more" disclosure kicks in. */
const COLLAPSED_HIGHLIGHTS = 2;

const oldest = workExperience[workExperience.length - 1];
const newest = workExperience[0];
const tenure =
  oldest && newest
    ? formatDateRange(oldest.startDate, newest.endDate)
    : oldest
      ? `${formatMonth(oldest.startDate)} — Present`
      : "";

export function Experience() {
  const uid = useId();
  const listRef = useRef<HTMLOListElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The current role reads expanded; everything else starts collapsed.
  const [openRoles, setOpenRoles] = useState<string[]>(() =>
    newest ? [newest.company] : [],
  );

  useEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    const fill = fillRef.current;
    const glow = glowRef.current;
    if (!list || !rail || !fill || !glow) return;

    // Reduced motion: no GSAP at all, rail simply renders fully lit.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }

    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const travel = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      travel
        .fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          glow,
          { y: 0 },
          { y: () => rail.offsetHeight, duration: 1, ease: "none" },
          0,
        )
        .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0)
        .to(glow, { opacity: 0, duration: 0.06 }, 0.94);

      nodeRefs.current.forEach((node, index) => {
        const row = itemRefs.current[index];
        if (!node || !row) return;
        gsap.fromTo(
          node,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  // Expanding a card changes the document height — re-measure every trigger.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { ScrollTrigger } = ensureGsap();
    ScrollTrigger.refresh();
  }, [openRoles]);

  const toggle = (company: string) =>
    setOpenRoles((prev) =>
      prev.includes(company)
        ? prev.filter((entry) => entry !== company)
        : [...prev, company],
    );

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="03 — Experience"
        title={
          <>
            {workExperience.length} roles, one{" "}
            <span className="text-gradient">throughline</span>
          </>
        }
        lead="Backend architecture and applied machine learning, shipped inside products that had to work — fraud detection, recommender systems, computer vision on the edge."
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {tenure ? (
          <Chip tone="accent" size="md">
            {tenure}
          </Chip>
        ) : null}
        <span className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
          Lead · CTO · IC
        </span>
      </div>

      {/* The rail sits outside the <ol>: a list may only contain <li>,
          <script> and <template>, and the track is purely presentational.
          Wrapping both in one positioned box keeps the geometry identical. */}
      <div className="relative mt-14 sm:mt-16">
        {/* Rail: static track, scrubbed fill, travelling light node. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-4 w-px lg:left-1/2 lg:-ml-px"
        >
          <div ref={railRef} className="relative h-full w-px">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,var(--border-strong)_5%,var(--border-strong)_92%,transparent)]" />
            <div
              ref={fillRef}
              className="absolute inset-0 origin-top scale-y-0 bg-[linear-gradient(180deg,transparent,var(--accent)_5%,var(--accent-2)_55%,var(--accent-3))]"
            />
            <div ref={glowRef} className="absolute top-0 left-0 w-px opacity-0">
              <span className="absolute top-0 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_50%,transparent),transparent_68%)]" />
            </div>
          </div>
        </div>

        <ol ref={listRef}>
          {workExperience.map((role, index) => {
            const isCurrent = role.endDate === "present";
            const isRight = index % 2 === 1;
            const open = openRoles.includes(role.company);
            const listId = `${uid}-${index}`;
            const hiddenCount = role.highlights.length - COLLAPSED_HIGHLIGHTS;
            const shown = open
              ? role.highlights
              : role.highlights.slice(0, COLLAPSED_HIGHLIGHTS);

            return (
              <li
                key={role.company}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative pb-10 pl-12 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pb-14 lg:pl-0"
              >
                <span
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  aria-hidden
                  className="border-edge-strong bg-bg-elevated absolute top-7 left-4 z-[2] -ml-3 flex h-6 w-6 items-center justify-center rounded-full border lg:left-1/2"
                >
                  {isCurrent ? (
                    <>
                      <span className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_40%,transparent)] motion-safe:animate-ping" />
                      <span className="bg-accent relative h-2 w-2 rounded-full" />
                    </>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklab,var(--fg-subtle)_75%,transparent)]" />
                  )}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "absolute top-10 hidden h-px w-8 lg:block",
                    isRight
                      ? "left-1/2 ml-4 bg-[linear-gradient(90deg,var(--border-strong),transparent)]"
                      : "right-1/2 mr-4 bg-[linear-gradient(90deg,transparent,var(--border-strong))]",
                  )}
                />

                <Reveal
                  delay={0.04}
                  className={cn("lg:col-start-1", isRight && "lg:col-start-2")}
                >
                  <GlassPanel
                    as="article"
                    tier={2}
                    sheen
                    edge
                    hover
                    className="p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <Monogram name={role.company} size="md" />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base leading-snug font-semibold sm:text-lg">
                          {role.role}
                        </h3>
                        <p className="text-accent mt-1 text-sm font-medium">
                          {role.company}
                        </p>
                      </div>
                      {isCurrent ? (
                        <span className="text-accent-3 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--accent-3)_16%,transparent)] px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                          <span className="bg-accent-3 h-1.5 w-1.5 rounded-full motion-safe:animate-pulse" />
                          Now
                        </span>
                      ) : (
                        <span className="text-fg-subtle shrink-0 font-mono text-[10px] tracking-[0.2em]">
                          {String(workExperience.length - index).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] tracking-[0.16em] uppercase">
                      <span className="text-fg-muted">
                        {formatDateRange(role.startDate, role.endDate)}
                      </span>
                      <span aria-hidden className="bg-edge-strong h-3 w-px" />
                      <span className="text-fg-subtle inline-flex items-center gap-1">
                        <MapPin aria-hidden className="h-3 w-3" />
                        {role.location}
                      </span>
                    </div>

                    {role.note ? (
                      <div className="mt-3">
                        <Chip tone="accent">{role.note}</Chip>
                      </div>
                    ) : null}

                    <p className="text-fg-muted mt-4 text-sm leading-relaxed">
                      {role.summary}
                    </p>

                    <div aria-hidden className="rule my-5" />

                    <ul id={listId} className="flex flex-col gap-3">
                      {shown.map((highlight) => (
                        <li key={highlight.label} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="bg-accent-2 mt-[0.45rem] h-1 w-1 shrink-0 rounded-full"
                          />
                          <p className="text-fg-muted text-sm leading-relaxed">
                            <span className="text-fg font-medium">
                              {highlight.label}
                            </span>
                            <span aria-hidden className="text-fg-subtle">
                              {" — "}
                            </span>
                            {highlight.detail}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {hiddenCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => toggle(role.company)}
                        aria-expanded={open}
                        aria-controls={listId}
                        className="border-edge-strong text-fg-muted hover:text-accent mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)]"
                      >
                        {open ? (
                          <Minus aria-hidden className="h-3 w-3" />
                        ) : (
                          <Plus aria-hidden className="h-3 w-3" />
                        )}
                        {open
                          ? "Show less"
                          : `${hiddenCount} more highlight${hiddenCount > 1 ? "s" : ""}`}
                      </button>
                    ) : null}

                    <ChipRail items={role.stack} className="mt-5" />
                  </GlassPanel>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
