import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  /** Small mono label above the title, e.g. "04 — Experience". */
  eyebrow: string;
  title: ReactNode;
  /** Optional supporting paragraph. */
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="text-accent flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase">
          <span
            aria-hidden
            className="h-px w-8 bg-[linear-gradient(90deg,transparent,var(--accent))]"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-fg-muted max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/** Consistent vertical rhythm and scroll anchoring for every section. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-anchor relative py-24 sm:py-28 md:py-36",
        className,
      )}
    >
      <div className="section-shell">{children}</div>
    </section>
  );
}
