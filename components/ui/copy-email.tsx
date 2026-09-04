"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { Check, Copy } from "lucide-react";
import { links } from "@/data/links";
import { cn } from "@/lib/utils";
import { useSpecular } from "@/lib/use-specular";

type CopyState = "idle" | "copied" | "manual";

const email = links.email;

/** How long the resolved state holds before reverting. */
const REVERT_MS: Record<Exclude<CopyState, "idle">, number> = {
  copied: 2000,
  manual: 4000,
};

const LABEL: Record<CopyState, string> = {
  idle: "Copy email",
  copied: "Copied",
  manual: "Press ⌘C",
};

/** Spoken text — the glyph "⌘" does not read reliably in screen readers. */
const ANNOUNCEMENT: Record<CopyState, string> = {
  idle: "",
  copied: "Email address copied",
  manual: "Copying failed. Press Command or Control C to copy the address.",
};

// Constants, not derived values: the icon swap must be identical every time.
const ICON_TRANSITION: MotionProps["transition"] = {
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1],
};
const ICON_ENTER = { opacity: 0, scale: 0.55 };
const ICON_SETTLED = { opacity: 1, scale: 1 };
const ICON_LEAVE = { opacity: 0, scale: 0.55 };

/**
 * Two ways to get the address onto the clipboard, tried in order.
 *
 * The async API is unavailable on http origins and in older Safari, and can
 * reject on a denied permission, so the deprecated execCommand path stays as a
 * fallback. Focus is handed back to whatever had it, because selecting the
 * off-screen mirror steals it.
 */
async function writeToClipboard(mirror: HTMLTextAreaElement | null) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
      return true;
    }
  } catch {
    // Fall through to the selection-based path.
  }

  if (!mirror) return false;

  const previous =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  try {
    mirror.focus({ preventScroll: true });
    mirror.setSelectionRange(0, email.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    previous?.focus({ preventScroll: true });
  }
}

interface CopyEmailProps {
  className?: string;
  variant?: "button" | "inline";
}

/**
 * Copy-to-clipboard control for the email address.
 *
 * A bare `mailto:` dead-ends for the many desktop visitors with no mail client
 * registered, so the address is always obtainable without one.
 *
 * All state moves in the click handler or the revert timer — never in an effect
 * body, which `react-hooks/set-state-in-effect` would reject.
 */
export function CopyEmail({ className, variant = "button" }: CopyEmailProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mirrorRef = useRef<HTMLTextAreaElement>(null);
  const specular = useSpecular<HTMLButtonElement>();

  // Registers a cleanup and nothing else, so no state is set during the effect.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    const ok = await writeToClipboard(mirrorRef.current);
    const next: Exclude<CopyState, "idle"> = ok ? "copied" : "manual";

    if (timerRef.current) clearTimeout(timerRef.current);
    setState(next);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setState("idle");
    }, REVERT_MS[next]);
  }, []);

  const onClick = useCallback(() => {
    void copy();
  }, [copy]);

  const copied = state === "copied";
  const Icon = copied ? Check : Copy;

  /** Crossfading icon slot. The key change is what drives the swap. */
  const icon = (
    <span
      aria-hidden
      className="relative grid h-4 w-4 shrink-0 place-items-center"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={ICON_ENTER}
          animate={ICON_SETTLED}
          exit={ICON_LEAVE}
          transition={ICON_TRANSITION}
          className="absolute inset-0 grid place-items-center"
        >
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </motion.span>
      </AnimatePresence>
    </span>
  );

  /* The mirror is the execCommand target: off-screen, untabbable, never read. */
  const shared = (
    <>
      <span aria-live="polite" role="status" className="sr-only">
        {ANNOUNCEMENT[state]}
      </span>
      <textarea
        ref={mirrorRef}
        aria-hidden
        tabIndex={-1}
        readOnly
        defaultValue={email}
        className="pointer-events-none fixed top-0 left-[-9999px] h-px w-px resize-none border-0 p-0 opacity-0"
      />
    </>
  );

  if (variant === "inline") {
    return (
      <>
        <button
          type="button"
          onClick={onClick}
          aria-label={`Copy email address ${email} to clipboard`}
          className={cn(
            "hover:text-accent inline-flex items-center gap-1.5 rounded-sm font-mono text-[0.95em] tracking-tight underline decoration-[color-mix(in_oklab,currentColor_45%,transparent)] decoration-dotted underline-offset-[5px] transition-colors",
            copied ? "text-accent-3" : "text-fg",
            className,
          )}
        >
          <span>{email}</span>
          {icon}
        </button>
        {shared}
      </>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={`Copy email address ${email} to clipboard`}
        title={email}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        {...specular}
        className={cn(
          "glass-1 glass-sheen relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
          copied ? "text-accent-3" : "text-fg-muted hover:text-fg",
          className,
        )}
      >
        {icon}
        {/* Invisible sizer keeps the pill from shrinking as the label changes. */}
        <span className="grid text-left">
          <span aria-hidden className="invisible col-start-1 row-start-1">
            {LABEL.idle}
          </span>
          <span className="col-start-1 row-start-1 whitespace-nowrap">
            {LABEL[state]}
          </span>
        </span>
      </motion.button>
      {shared}
    </>
  );
}
