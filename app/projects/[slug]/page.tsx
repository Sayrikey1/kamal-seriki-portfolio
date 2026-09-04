import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { ActionButton } from "@/components/ui/action-button";
import { GitHubIcon } from "@/components/ui/brand-icons";
import {
  CATEGORY_STYLES,
  CategoryVisual,
} from "@/components/ui/category-visual";
import { Chip, ChipRail } from "@/components/ui/chip";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { caseStudyProjects, getProject } from "@/data/projects";
import { links } from "@/data/links";

/** Only the projects with a written case study get a route. */
export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Case study not found" };

  return {
    title: `${project.title} — Case study`,
    description: project.oneLiner,
  };
}

/** Shared eyebrow + heading for each body block. */
function BlockHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-accent flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase">
      <span
        aria-hidden
        className="h-px w-8 bg-[linear-gradient(90deg,transparent,var(--accent))]"
      />
      {children}
    </h2>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.caseStudy) notFound();

  const caseStudy = project.caseStudy;
  const repoUrl = project.links.github;
  const metrics = project.metrics ?? [];
  const category = CATEGORY_STYLES[project.category];
  const nextCase = caseStudyProjects.find(
    (entry) => entry.slug !== project.slug,
  );

  return (
    <article className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-70"
      />

      <div className="section-shell relative">
        <div className="mx-auto max-w-4xl">
          {/* ── Back ───────────────────────────────────────────── */}
          <Reveal y={12}>
            <Link
              href="/#projects"
              className="group text-fg-subtle hover:text-accent inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                strokeWidth={1.8}
              />
              Back to work
            </Link>
          </Reveal>

          {/* ── Header ─────────────────────────────────────────── */}
          <header className="mt-8 flex flex-col gap-5 sm:mt-10">
            <Reveal delay={0.04} y={16}>
              <div className="flex flex-wrap items-center gap-2.5">
                <Chip tone="accent" size="md">
                  {category.label}
                </Chip>
                <span className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
                  Case study
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08} y={18}>
              <h1 className="text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={18}>
              <p className="text-fg-muted max-w-2xl text-lg leading-relaxed sm:text-xl">
                {project.oneLiner}
              </p>
            </Reveal>
          </header>

          {/* ── Hero visual ────────────────────────────────────── */}
          <Reveal delay={0.16} className="mt-10 sm:mt-14">
            <GlassPanel tier={3} edge className="p-2 sm:p-3">
              <CategoryVisual
                category={project.category}
                className="h-48 rounded-[1.25rem] sm:h-64 md:h-80"
              />
            </GlassPanel>
          </Reveal>

          {/* ── Metadata strip ─────────────────────────────────── */}
          <Reveal delay={0.06} className="mt-6 sm:mt-8">
            <GlassPanel tier={2} edge className="p-5 sm:p-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-fg-subtle font-mono text-[11px] tracking-[0.22em] uppercase">
                    Stack
                  </p>
                  <ChipRail items={project.stack} className="mt-3.5" />
                </div>

                <div className="min-w-0">
                  {metrics.length > 0 ? (
                    <>
                      <p className="text-fg-subtle font-mono text-[11px] tracking-[0.22em] uppercase">
                        Highlights
                      </p>
                      <ul className="mt-3.5 space-y-2">
                        {metrics.map((metric) => (
                          <li
                            key={metric}
                            className="text-fg-muted flex gap-2.5 font-mono text-xs leading-relaxed"
                          >
                            <span
                              aria-hidden
                              className="bg-accent mt-[0.5em] h-1 w-1 shrink-0 rounded-full"
                            />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {repoUrl ? (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-1 glass-hover text-fg-muted hover:text-fg mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      View source
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </a>
                  ) : null}
                </div>
              </div>
            </GlassPanel>
          </Reveal>

          {/* ── Prose body ─────────────────────────────────────── */}
          <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-20">
            <Reveal>
              <p className="text-fg-muted max-w-[62ch] text-base leading-[1.75] sm:text-lg">
                {project.description}
              </p>
            </Reveal>

            <Reveal>
              <section className="flex flex-col gap-5">
                <BlockHeading>The problem</BlockHeading>
                <p className="text-fg-muted max-w-[62ch] text-base leading-[1.75] sm:text-lg">
                  {caseStudy.problem}
                </p>
              </section>
            </Reveal>

            <section className="flex flex-col gap-6">
              <Reveal>
                <BlockHeading>Approach</BlockHeading>
              </Reveal>
              <ol className="flex list-none flex-col gap-3">
                {caseStudy.approach.map((step, index) => (
                  <li key={step}>
                    <Reveal delay={index * 0.06}>
                      <GlassPanel tier={2} edge hover className="p-5 sm:p-6">
                        <div className="flex gap-4 sm:gap-5">
                          <span
                            aria-hidden
                            className="text-accent shrink-0 font-mono text-sm tabular-nums"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-fg-muted text-sm leading-[1.7] sm:text-base">
                            {step}
                          </p>
                        </div>
                      </GlassPanel>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>

            <Reveal>
              <section className="flex flex-col gap-5">
                <BlockHeading>Outcome</BlockHeading>
                <GlassPanel tier={3} edge className="p-6 sm:p-8">
                  <p className="text-fg max-w-[54ch] border-l-2 border-l-[color:var(--accent)] pl-5 text-lg leading-[1.6] sm:text-xl">
                    {caseStudy.outcome}
                  </p>
                </GlassPanel>
              </section>
            </Reveal>
          </div>

          {/* ── Closing ────────────────────────────────────────── */}
          <div aria-hidden className="rule mt-16 sm:mt-24" />

          <Reveal className="mt-10">
            <div className="flex flex-col gap-8">
              {nextCase ? (
                <Link
                  href={`/projects/${nextCase.slug}`}
                  className="group flex flex-col gap-1.5 text-left"
                >
                  <span className="text-fg-subtle font-mono text-[11px] tracking-[0.22em] uppercase">
                    Next case study
                  </span>
                  <span className="text-fg group-hover:text-accent inline-flex items-center gap-2 text-xl font-semibold transition-colors sm:text-2xl">
                    {nextCase.title}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-fg-muted max-w-xl text-sm leading-relaxed">
                    {nextCase.oneLiner}
                  </span>
                </Link>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <ActionButton href={`mailto:${links.email}`}>
                  Start a conversation
                </ActionButton>
                <Link
                  href="/#projects"
                  className="glass-1 glass-hover text-fg hover:text-accent inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                  All work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
