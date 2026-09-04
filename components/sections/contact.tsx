"use client";

import type { ComponentType, SVGProps } from "react";
import { Clock, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section-heading";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { ActionButton } from "@/components/ui/action-button";
import { CopyEmail } from "@/components/ui/copy-email";
import { ResumeButton } from "@/components/ui/resume-button";
import {
  GitHubIcon,
  LinkedInIcon,
  ScholarIcon,
} from "@/components/ui/brand-icons";
import { links } from "@/data/links";
import { profile } from "@/data/profile";
import { useSpecular } from "@/lib/use-specular";

interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
  { label: "Google Scholar", href: links.scholar, Icon: ScholarIcon },
];

/**
 * Closing beat. One centred tier-3 panel — the third and final refracting
 * surface on the page — so the background glass object reads around it.
 * Email only, by owner decision: no form, no phone number.
 */
export function Contact() {
  // The panel's own sheen is wired inside GlassPanel; these handlers light the
  // smaller social pills. Sharing one instance is safe — it reads currentTarget.
  const specular = useSpecular<HTMLAnchorElement>();

  return (
    <Section id="contact">
      <Reveal
        y={28}
        className="mx-auto flex max-w-3xl flex-col items-center gap-9 sm:gap-11"
      >
        <span className="text-accent flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase">
          <span
            aria-hidden
            className="h-px w-8 bg-[linear-gradient(90deg,transparent,var(--accent))]"
          />
          07 — Contact
          <span
            aria-hidden
            className="h-px w-8 bg-[linear-gradient(270deg,transparent,var(--accent))]"
          />
        </span>

        <GlassPanel
          tier={3}
          sheen
          edge
          refract
          as="article"
          className="w-full text-center"
        >
          <div className="flex flex-col items-center gap-7 px-5 py-12 sm:gap-8 sm:px-10 sm:py-16 md:px-14">
            {/* Availability */}
            <span className="glass-1 text-fg-muted inline-flex items-center gap-2.5 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase sm:text-[11px]">
              <span aria-hidden className="relative flex size-1.5 shrink-0">
                <span className="bg-accent-3 absolute inset-0 animate-ping rounded-full opacity-70" />
                <span className="bg-accent-3 relative size-1.5 rounded-full" />
              </span>
              Open to senior AI &amp; backend roles
            </span>

            <div className="flex flex-col items-center gap-5">
              <h2 className="max-w-2xl text-3xl leading-[1.08] font-semibold sm:text-4xl md:text-[3.25rem] md:leading-[1.04]">
                Let&apos;s build something that{" "}
                <span className="text-gradient">holds up in production.</span>
              </h2>

              <p className="text-fg-muted max-w-xl text-base leading-relaxed sm:text-lg">
                Send over the problem — the load it has to carry, the
                constraints around it — and I&apos;ll tell you what I would
                build and how I would prove it works.
              </p>
            </div>

            {/* Primary CTA is the address itself, so it can be read and copied.
                The copy control sits beside it because a bare mailto: dead-ends
                for anyone browsing without a mail client configured. */}
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <ActionButton
                href={`mailto:${links.email}`}
                className="max-w-full font-mono text-[12.5px] tracking-tight sm:text-sm"
              >
                <Mail
                  aria-hidden
                  className="size-4 shrink-0"
                  strokeWidth={1.9}
                />
                <span className="truncate">{links.email}</span>
              </ActionButton>
              <CopyEmail />
              <ResumeButton showSize />
            </div>

            {/* Elsewhere */}
            <div className="flex flex-col items-center gap-3.5 pt-1">
              <span className="text-fg-subtle font-mono text-[10px] tracking-[0.22em] uppercase">
                Elsewhere
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} profile — opens in a new tab`}
                    {...specular}
                    className="glass-1 glass-sheen glass-hover group text-fg-muted hover:text-fg focus-visible:text-fg inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors sm:text-sm"
                  >
                    <Icon className="text-fg-subtle group-hover:text-accent size-4 shrink-0 transition-colors" />
                    {label}
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.9}
                      className="text-fg-subtle group-hover:text-accent size-3.5 shrink-0 transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer line */}
            <div className="flex w-full flex-col items-center gap-4 pt-2">
              <span aria-hidden className="rule block w-full max-w-xs" />
              <div className="text-fg-subtle flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.06em]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    aria-hidden
                    strokeWidth={1.7}
                    className="size-3.5 shrink-0"
                  />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock
                    aria-hidden
                    strokeWidth={1.7}
                    className="size-3.5 shrink-0"
                  />
                  WAT · UTC+1
                </span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </Section>
  );
}
