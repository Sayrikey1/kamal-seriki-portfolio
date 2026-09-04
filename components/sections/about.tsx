import type { ReactNode } from "react";
import { Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section-heading";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ChipRail } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { Monogram } from "@/components/ui/monogram";
import { ActionButton } from "@/components/ui/action-button";
import { cn } from "@/lib/utils";

import { profile } from "@/data/profile";
import { workExperience } from "@/data/work-experience";
import { education } from "@/data/education";
import { skillGroups } from "@/data/skills";

interface Fact {
  label: string;
  value: ReactNode;
}

/**
 * The narrative beat: mechanical engineering degree, AI/backend career. The
 * three paragraphs in `profile.about` carry the argument verbatim; the side
 * panel is the scannable counterpart for readers who skim.
 */
export function About() {
  const current = workExperience[0];
  const degree = education[0];

  const facts: Fact[] = [
    {
      // Derived, not hardcoded: the label has to stay honest when the newest
      // role is no longer ongoing.
      label: current.endDate === "present" ? "Currently" : "Most recently",
      value: (
        <span className="flex items-center gap-2.5">
          <Monogram name={current.company} size="sm" />
          <span>
            {current.role} · {current.company}
          </span>
        </span>
      ),
    },
    { label: "Based in", value: profile.location },
    {
      label: "Education",
      value: `${degree.degree} · ${degree.institution}`,
    },
    {
      label: "Experience",
      value: `${profile.yearsExperience}+ years across ${workExperience.length} companies`,
    },
    {
      label: "Focus",
      value: (
        <ChipRail
          className="pt-0.5"
          items={skillGroups.slice(0, 4).map((group) => group.title)}
        />
      ),
    },
  ];

  return (
    <Section id="about">
      <div className="relative">
        {/* Single ambient accent — CSS keyframes only, so the global
            reduced-motion gate stops it without a hook. */}
        <span
          aria-hidden
          className="animate-float pointer-events-none absolute top-16 -right-10 z-0 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,var(--glow-1),transparent_70%)] blur-2xl lg:block"
        />

        <div className="relative z-10">
          <SectionHeading
            eyebrow="01 — About"
            title={
              <>
                Trained on mechanical systems.{" "}
                <span className="text-gradient">
                  Shipping intelligent ones.
                </span>
              </>
            }
          />

          {/* Typographic centrepiece */}
          <Reveal delay={0.18} className="mt-12 sm:mt-14">
            <figure className="relative max-w-4xl">
              <Quote
                aria-hidden
                strokeWidth={1.5}
                className="absolute top-0 left-0 h-8 w-8 text-[color-mix(in_oklab,var(--accent)_36%,transparent)] sm:h-11 sm:w-11"
              />
              <blockquote className="pl-11 sm:pl-16">
                <p className="font-display text-fg text-xl leading-[1.3] font-medium tracking-tight sm:text-2xl md:text-[2rem] md:leading-[1.22]">
                  {profile.strapline}
                </p>
              </blockquote>
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            {/* Narrative */}
            <div className="max-w-[62ch] space-y-6 sm:space-y-7">
              {profile.about.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p
                    className={cn(
                      "text-fg-muted",
                      index === 0
                        ? "text-[1.0625rem] leading-[1.75] sm:text-xl sm:leading-[1.6]"
                        : "text-base leading-[1.8] sm:text-[1.0625rem]",
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* At a glance */}
            <Reveal delay={0.12} y={26}>
              <GlassPanel as="aside" tier={2} sheen edge className="p-6 sm:p-7">
                <h3 className="text-base font-semibold tracking-tight">
                  At a glance
                </h3>

                <dl className="mt-4">
                  {facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={cn(
                        "flex flex-col gap-1.5 py-3.5",
                        index > 0 && "border-edge border-t",
                      )}
                    >
                      <dt className="text-fg-subtle font-mono text-[10px] tracking-[0.22em] uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-fg text-sm leading-snug">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex">
                  <ActionButton href="#experience" variant="ghost">
                    See the full timeline
                  </ActionButton>
                </div>
              </GlassPanel>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
