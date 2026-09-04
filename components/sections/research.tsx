import { Fragment } from "react";
import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Chip, ChipRail } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { ActionButton } from "@/components/ui/action-button";
import { ScholarIcon } from "@/components/ui/brand-icons";
import { publications, scholarProfile } from "@/data/publications";
import { links } from "@/data/links";

/** The exact form his name takes in every author list on the Scholar profile. */
const SELF_AUTHOR = "K. T. Seriki";

const totalCitations = publications.reduce(
  (sum, publication) => sum + publication.citations,
  0,
);

/**
 * Renders the author string verbatim, accenting only the author's own name so a
 * reader can locate him without us retyping (or reordering) the credit list.
 */
function AuthorList({ authors }: { authors: string }) {
  const segments = authors.split(SELF_AUTHOR);

  return (
    <p className="text-fg-muted mt-3 text-[13px] leading-relaxed sm:text-sm">
      {segments.map((segment, index) => (
        <Fragment key={index}>
          {segment}
          {index < segments.length - 1 ? (
            <strong className="text-accent font-semibold">{SELF_AUTHOR}</strong>
          ) : null}
        </Fragment>
      ))}
    </p>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-fg font-mono text-2xl leading-none font-light tabular-nums sm:text-3xl">
        {value}
      </div>
      <div className="text-fg-subtle mt-2 font-mono text-[10px] tracking-[0.18em] uppercase">
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="bg-edge hidden h-9 w-px sm:block" />;
}

export function Research() {
  return (
    <Section id="research">
      <SectionHeading
        eyebrow="06 — Research"
        title={
          <>
            Peer-reviewed{" "}
            <span className="text-gradient">machine learning</span> research.
          </>
        }
        lead="Three co-authored papers published in 2025, applying neural and ensemble methods to energy and industrial systems. Indexed on Google Scholar."
      />

      {/* Profile strip — figures computed from the data, never hardcoded. */}
      <Reveal className="mt-10 sm:mt-12" delay={0.04}>
        <GlassPanel tier={3} edge sheen>
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <Figure value={String(totalCitations)} label="Total citations" />
              <Divider />
              <Figure
                value={String(publications.length)}
                label="Peer-reviewed papers"
              />
              <Divider />
              <div>
                <div className="font-display text-fg text-base leading-tight font-medium sm:text-lg">
                  {scholarProfile.affiliation}
                </div>
                <div className="text-fg-subtle mt-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                  Affiliation
                </div>
              </div>
              <ActionButton
                href={links.scholar}
                variant="ghost"
                external
                className="w-full justify-center sm:ml-auto sm:w-auto"
              >
                <ScholarIcon className="size-4" />
                View Google Scholar profile
              </ActionButton>
            </div>

            <div className="rule" />

            <div>
              <span className="text-fg-subtle font-mono text-[10px] tracking-[0.18em] uppercase">
                Research interests
              </span>
              <ChipRail
                items={scholarProfile.interests}
                className="mt-3"
                tone="neutral"
              />
            </div>

            <p className="text-fg-subtle text-[11px] leading-relaxed">
              Citation counts are point-in-time figures from Google Scholar and
              will drift.
            </p>
          </div>
        </GlassPanel>
      </Reveal>

      {/* Citation list — typographic, not card-shaped. */}
      <ol className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
        {publications.map((publication, index) => (
          <li key={publication.title}>
            <Reveal delay={index * 0.07}>
              <GlassPanel tier={2} hover sheen as="article">
                <div className="grid gap-4 p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 sm:p-7">
                  <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                    <span
                      aria-hidden
                      className="font-mono text-3xl leading-none font-light text-[color-mix(in_oklab,var(--accent)_72%,var(--fg-subtle))] tabular-nums sm:text-4xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-fg-subtle font-mono text-[10px] tracking-[0.18em] uppercase">
                      {publication.year}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-display text-fg text-base leading-snug font-semibold sm:text-lg md:text-xl">
                      {publication.title}
                    </h3>

                    <AuthorList authors={publication.authors} />

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-fg-subtle text-[13px] leading-snug italic sm:text-sm">
                        {publication.venue}
                      </span>
                      {publication.citations > 0 ? (
                        <Chip tone="accent">
                          <Quote aria-hidden className="mr-1.5 size-3" />
                          {publication.citations}
                          {publication.citations === 1
                            ? " citation"
                            : " citations"}
                        </Chip>
                      ) : (
                        <Chip tone="neutral">Not yet cited</Chip>
                      )}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
