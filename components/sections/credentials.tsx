import {
  Award,
  GraduationCap,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { certifications, communityRoles } from "@/data/certifications";
import { education } from "@/data/education";
import { cn, formatDateRange } from "@/lib/utils";
import type { Certification } from "@/types/content";

interface KindStyle {
  icon: LucideIcon;
  label: string;
  /** Tinted icon tile. */
  tile: string;
  /** Border tint on the panel itself — the award reads slightly warmer. */
  panel: string;
  chip: string;
}

const KIND_STYLES: Record<Certification["kind"], KindStyle> = {
  certification: {
    icon: ShieldCheck,
    label: "Certification",
    tile: "border-[color-mix(in_oklab,var(--accent)_26%,transparent)] bg-[color-mix(in_oklab,var(--accent)_13%,transparent)] text-accent",
    panel: "",
    chip: "text-fg-subtle",
  },
  award: {
    icon: Award,
    label: "Award",
    tile: "border-[color-mix(in_oklab,var(--accent-2)_32%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_16%,transparent)] text-accent-2",
    panel: "border-[color-mix(in_oklab,var(--accent-2)_34%,transparent)]",
    chip: "border-transparent text-accent-2 [background-color:color-mix(in_oklab,var(--accent-2)_15%,transparent)]",
  },
};

interface SubHeadProps {
  index: string;
  label: string;
}

/** Small typographic label + hairline rule. Keeps the three blocks distinct. */
function SubHead({ index, label }: SubHeadProps) {
  return (
    <Reveal y={14} className="mb-6 sm:mb-7">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold sm:text-xl">{label}</h3>
        <span aria-hidden className="rule h-px flex-1" />
        <span className="text-fg-subtle font-mono text-[10px] tracking-[0.22em] uppercase">
          {index}
        </span>
      </div>
    </Reveal>
  );
}

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeading
        eyebrow="05 — Credentials"
        title="Foundations, credentials and community."
        lead="The engineering fundamentals underneath the ML work, the specialisations layered on top, and the communities I mentor in."
      />

      <div className="mt-14 flex flex-col gap-14 sm:mt-16 sm:gap-16">
        {/* ── Education ─────────────────────────────────────────────────── */}
        <div>
          <SubHead index="05.1" label="Education" />

          <div className="flex flex-col gap-4">
            {education.map((entry) => (
              <Reveal key={`${entry.degree}-${entry.institution}`} y={14}>
                <GlassPanel tier={2} sheen edge className="p-6 sm:p-8 md:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_70%)]"
                  />

                  <div className="relative flex flex-col gap-6 md:flex-row md:gap-8">
                    <span
                      aria-hidden
                      className="text-accent grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[color-mix(in_oklab,var(--accent)_26%,transparent)] bg-[color-mix(in_oklab,var(--accent)_13%,transparent)]"
                    >
                      <GraduationCap className="h-7 w-7" strokeWidth={1.4} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-fg-subtle font-mono text-[11px] tracking-[0.18em] uppercase">
                        {formatDateRange(entry.startDate, entry.endDate)}
                      </p>

                      <h4 className="mt-3 text-xl leading-tight font-semibold sm:text-2xl">
                        {entry.degree}
                      </h4>

                      <p className="text-fg-muted mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm sm:text-base">
                        <span className="text-fg font-medium">
                          {entry.institution}
                        </span>
                        <span aria-hidden className="text-fg-subtle">
                          ·
                        </span>
                        <span>{entry.location}</span>
                      </p>

                      {entry.detail ? (
                        <>
                          <span aria-hidden className="rule mt-6 block h-px" />
                          <p className="text-fg-muted mt-6 max-w-2xl text-sm leading-relaxed sm:text-base">
                            {entry.detail}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Certifications & Awards ───────────────────────────────────── */}
        <div>
          <SubHead index="05.2" label="Certifications & Awards" />

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => {
              const style = KIND_STYLES[item.kind];
              const Icon = style.icon;

              return (
                <li key={item.title} className="h-full">
                  <Reveal delay={index * 0.06} y={14} className="h-full">
                    <GlassPanel
                      tier={2}
                      hover
                      sheen
                      className={cn(
                        "flex h-full flex-col p-5 sm:p-6",
                        style.panel,
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                            style.tile,
                          )}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <Chip className={style.chip}>{style.label}</Chip>
                      </div>

                      <h4 className="mt-5 text-base leading-snug font-semibold sm:text-lg">
                        {item.title}
                      </h4>

                      <p className="text-fg-subtle mt-1.5 font-mono text-[10px] tracking-[0.16em] uppercase">
                        {item.issuer}
                      </p>

                      {item.detail ? (
                        <p className="text-fg-muted mt-4 text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      ) : null}
                    </GlassPanel>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Community ─────────────────────────────────────────────────── */}
        <div>
          <SubHead index="05.3" label="Community" />

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {communityRoles.map((role, index) => (
              <li key={role.organization}>
                <Reveal delay={index * 0.06} y={14}>
                  <GlassPanel
                    tier={1}
                    className="rounded-glass px-4 py-3.5 sm:px-5"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden
                        className="border-edge text-accent-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-[color-mix(in_oklab,var(--accent-3)_12%,transparent)]"
                      >
                        <Users className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-fg text-sm leading-snug font-medium">
                          {role.organization}
                        </p>
                        <p className="text-fg-subtle mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                          {role.role}
                        </p>
                      </div>
                    </div>
                  </GlassPanel>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
