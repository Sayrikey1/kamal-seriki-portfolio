"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Chip, ChipRail } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import {
  CATEGORY_STYLES,
  CategoryVisual,
} from "@/components/ui/category-visual";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { flagshipProjects, secondaryProjects } from "@/data/projects";
import { web3Fundamentals } from "@/data/web3-fundamentals";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/content";

type Filter = ProjectCategory | "all";

/** Stable display order for the filter rail, independent of data order. */
const CATEGORY_ORDER: ProjectCategory[] = [
  "ai-ml",
  "nlp",
  "computer-vision",
  "fullstack",
  "backend",
];

/** Every project's `image` is null by design — the visual is always generated. */
function FlagshipCard({ project, wide }: { project: Project; wide: boolean }) {
  const category = CATEGORY_STYLES[project.category];
  const metrics = project.metrics ?? [];

  return (
    <GlassPanel
      tier={2}
      sheen
      edge
      hover
      as="article"
      className="h-full"
      contentClassName="flex h-full flex-col"
    >
      <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
        <CategoryVisual
          category={project.category}
          className={wide ? "sm:h-52" : undefined}
        />

        <div className="flex flex-col gap-2">
          <Chip tone="accent" className="self-start">
            {category.label}
          </Chip>
          <h3
            className={cn(
              "font-display leading-snug font-semibold",
              wide ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            {project.title}
          </h3>
          <p className="text-fg-muted text-sm leading-relaxed">
            {project.oneLiner}
          </p>
        </div>

        {metrics.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {metrics.map((metric) => (
              <li
                key={metric}
                className="text-fg-subtle flex items-start gap-2 font-mono text-[11px] leading-relaxed"
              >
                <span
                  aria-hidden
                  className="bg-accent mt-[0.4rem] h-1 w-1 shrink-0 rounded-full"
                />
                {metric}
              </li>
            ))}
          </ul>
        ) : null}

        <ChipRail items={project.stack} />

        <div className="border-edge mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the source code for ${project.title} on GitHub`}
              className="text-fg-muted hover:text-fg inline-flex items-center gap-2 text-xs font-medium transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
              Code
            </a>
          ) : null}

          {project.caseStudy ? (
            <Link
              href={`/projects/${project.slug}`}
              className="group/cs text-accent hover:text-accent-2 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              Read case study
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </GlassPanel>
  );
}

/** Deliberately denser and quieter than the flagship treatment. */
function SecondaryCard({ project }: { project: Project }) {
  return (
    <GlassPanel tier={2} hover as="li" className="h-full">
      <div className="flex gap-3 p-3.5 sm:gap-4 sm:p-4">
        <CategoryVisual
          category={project.category}
          compact
          className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <h4 className="text-sm leading-snug font-semibold">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the source code for ${project.title} on GitHub`}
                className="hover:text-accent inline-flex items-center gap-1.5 transition-colors"
              >
                {project.title}
                <GitHubIcon className="text-fg-subtle h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              project.title
            )}
          </h4>
          <p className="text-fg-muted text-xs leading-relaxed">
            {project.oneLiner}
          </p>
          <ChipRail items={project.stack.slice(0, 2)} className="pt-0.5" />
        </div>
      </div>
    </GlassPanel>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  /** "All" plus every category actually present in the flagship set. */
  const filters = useMemo(() => {
    const everything = [...flagshipProjects, ...secondaryProjects];
    const present = CATEGORY_ORDER.filter((category) =>
      flagshipProjects.some((project) => project.category === category),
    );
    return [
      { value: "all" as Filter, label: "All", count: everything.length },
      ...present.map((category) => ({
        value: category as Filter,
        label: CATEGORY_STYLES[category].label,
        count: everything.filter((project) => project.category === category)
          .length,
      })),
    ];
  }, []);

  const matches = (project: Project) =>
    filter === "all" || project.category === filter;
  const flagship = flagshipProjects.filter(matches);
  const secondary = secondaryProjects.filter(matches);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="04 — Selected work"
        title={
          <>
            Systems I built, <span className="text-gradient">end to end</span>.
          </>
        }
        lead="Retrieval pipelines, streaming infrastructure and platform backends — every one of them a public repository rather than a screenshot."
      />

      <Reveal delay={0.16} className="mt-10">
        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap gap-2"
        >
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                "glass-1 inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[11px] tracking-wider uppercase transition-colors",
                filter === option.value
                  ? "text-accent [background-color:color-mix(in_oklab,var(--accent)_16%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {option.label}
              <span className="tabular-nums opacity-60">{option.count}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <p aria-live="polite" className="sr-only">
        {`${flagship.length + secondary.length} projects shown.`}
      </p>

      <Reveal
        delay={0.06}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {flagship.map((project, index) => {
            const wide =
              filter === "all" &&
              (index === 0 || index === flagship.length - 1);
            return (
              <motion.div
                key={project.slug}
                layout="position"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn("h-full", wide && "sm:col-span-2")}
              >
                <FlagshipCard project={project} wide={wide} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Reveal>

      {secondary.length > 0 ? (
        <Reveal delay={0.06} className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-lg font-semibold">Also built</h3>
            <span className="text-fg-subtle font-mono text-[11px] tracking-wider uppercase">
              {secondary.length} more repositories
            </span>
          </div>
          <div className="rule mt-4" />
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((project) => (
              <SecondaryCard key={project.slug} project={project} />
            ))}
          </ul>
        </Reveal>
      ) : null}

      <Reveal delay={0.06} className="mt-14">
        <GlassPanel tier={2} edge className="p-5 sm:p-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                aria-hidden
                className="border-edge text-accent-3 grid h-9 w-9 shrink-0 place-items-center rounded-xl border bg-[color-mix(in_oklab,var(--accent-3)_16%,transparent)]"
              >
                <FlaskConical className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-lg font-semibold sm:text-xl">
                {web3Fundamentals.title}
              </h3>
              <Chip>Study builds</Chip>
            </div>

            <p className="text-fg-muted max-w-3xl text-sm leading-relaxed">
              {web3Fundamentals.description}
            </p>

            <ChipRail items={web3Fundamentals.skills} />

            <div className="rule" />

            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {web3Fundamentals.repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${repo.name} repository on GitHub`}
                    className="group/repo flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  >
                    <GitHubIcon className="text-fg-subtle mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-fg group-hover/repo:text-accent flex items-center gap-1.5 font-mono text-xs transition-colors">
                        {repo.name}
                        <ArrowUpRight
                          aria-hidden
                          className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/repo:opacity-100"
                        />
                      </span>
                      <span className="text-fg-muted text-xs leading-relaxed">
                        {repo.description}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </GlassPanel>
      </Reveal>
    </Section>
  );
}
