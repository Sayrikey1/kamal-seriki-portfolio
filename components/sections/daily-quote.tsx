"use client";

import { useSyncExternalStore } from "react";
import { Quote as QuoteMark } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { quoteForDate } from "@/data/quotes";
import type { Quote } from "@/types/content";

/** Evaluated once at build time — the server and first client render use this. */
const BUILD_QUOTE = quoteForDate(new Date());

/** The date only turns over at midnight; nothing to subscribe to mid-session. */
const subscribe = () => () => {};
const getSnapshot = () => quoteForDate(new Date());
const getServerSnapshot = () => BUILD_QUOTE;

const TRADITION_LABEL: Record<Quote["tradition"], string> = {
  islamic: "Islamic ethical tradition",
  classical: "Classical leadership",
};

/**
 * Mirrors the "Quote of the Day" block on Kamal's GitHub profile README, drawing
 * from the same 63-entry pool and keeping attributions verbatim.
 *
 * The quote is chosen from the date, not at random, so it is stable for a given
 * day. useSyncExternalStore lets the server render the build-day quote and the
 * client correct to today's without a hydration mismatch — reading the date
 * during render would desynchronise the two trees.
 */
export function DailyQuote() {
  const quote = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-anchor relative py-14 sm:py-16"
    >
      <div className="section-shell">
        <Reveal y={14}>
          <GlassPanel
            tier={2}
            sheen
            edge
            as="figure"
            className="m-0 px-6 py-8 sm:px-10 sm:py-10"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="flex shrink-0 items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--accent)_26%,transparent)] bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
                >
                  <QuoteMark
                    className="text-accent h-4 w-4"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </span>
                <h2
                  id="quote-heading"
                  className="text-accent font-mono text-[11px] tracking-[0.22em] uppercase"
                >
                  Quote of the day
                </h2>
              </div>

              <div className="min-w-0 flex-1">
                {/* key on the text so a date rollover re-triggers the fade */}
                <blockquote key={quote.text}>
                  <p className="font-display text-xl leading-snug font-medium text-balance italic sm:text-2xl lg:text-[1.75rem]">
                    “{quote.text}”
                  </p>
                </blockquote>

                <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span
                    aria-hidden
                    className="h-px w-6 bg-[linear-gradient(90deg,var(--accent),transparent)]"
                  />
                  <cite className="text-fg text-sm font-semibold not-italic">
                    {quote.author}
                  </cite>
                  <span className="text-fg-subtle font-mono text-[10px] tracking-[0.16em] uppercase">
                    {TRADITION_LABEL[quote.tradition]}
                  </span>
                </figcaption>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
