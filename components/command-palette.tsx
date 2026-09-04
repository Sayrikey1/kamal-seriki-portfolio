"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Check,
  Download,
  Command as CommandKey,
  Copy,
  CornerDownLeft,
  Mail,
  Palette,
  Search,
} from "lucide-react";
import { links, resume, sections } from "@/data/links";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import {
  GitHubIcon,
  LinkedInIcon,
  ScholarIcon,
} from "@/components/ui/brand-icons";

/**
 * Command palette — Cmd/Ctrl+K, or "/" outside a text field.
 *
 * The trigger button lives elsewhere and needs no props: anything can open this
 * by dispatching `new Event("command-palette:open")` on window, or simply by
 * carrying a `data-command-palette` attribute.
 */
const OPEN_EVENT = "command-palette:open";
const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

type Group = "Navigate" | "Links" | "Actions";
type Icon = ComponentType<{ className?: string }>;

type Cmd = {
  id: string;
  label: string;
  keywords: string;
  group: Group;
  icon: Icon;
  hint?: string;
  /** Stays open so its transient row state is visible. */
  keepOpen?: boolean;
  run: () => void;
};

/** Runtime read only — never during render (see components/theme-provider.tsx). */
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True when focus sits somewhere that legitimately owns the "/" key. */
const isTyping = () => {
  const node = document.activeElement;
  if (!(node instanceof HTMLElement)) return false;
  return (
    node.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(node.tagName)
  );
};

const noSubscribe = () => () => {};
const readIsMac = () =>
  /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
const serverIsMac = () => false;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Primitive snapshot, so it is stable — the sanctioned way to hold a value
  // that differs between server and client (see components/ui/current-year.tsx).
  const isMac = useSyncExternalStore(noSubscribe, readIsMac, serverIsMac);

  const setPalette = useCallback((next: boolean) => {
    setQuery("");
    setActive(0);
    setOpen(next);
    // Unlock synchronously on close: a Navigate command scrolls immediately
    // after this, and a still-locked body would swallow the scroll.
    if (!next) document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); // else the browser opens its own search
        setPalette(!open);
      } else if (event.key === "/" && !open && !isTyping()) {
        event.preventDefault();
        setPalette(true);
      }
    };
    const onRequest = () => {
      if (!open) setPalette(true);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-command-palette]"))
        onRequest();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onRequest);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onRequest);
      document.removeEventListener("click", onClick);
    };
  }, [open, setPalette]);

  // Scroll lock + focus handoff. activeElement is still the trigger at this
  // point (React's commit does not move focus), and holding it in an effect
  // local rather than a ref keeps react-hooks/refs happy.
  useEffect(() => {
    if (!open) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      if (previous && document.contains(previous))
        previous.focus({ preventScroll: true });
    };
  }, [open]);

  // Transient "Copied" row state, reset from a timeout the effect owns.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const navigate = sections.map<Cmd>((section) => ({
      id: `go-${section.id}`,
      label: `Go to ${section.label}`,
      keywords: `${section.label} ${section.id} jump scroll section`,
      group: "Navigate",
      icon: ArrowRight,
      hint: `#${section.id}`,
      run: () =>
        document.getElementById(section.id)?.scrollIntoView({
          behavior: reduced() ? "auto" : "smooth",
          block: "start",
        }),
    }));

    const external = (
      [
        ["github", "GitHub", links.github, GitHubIcon, "source code repos"],
        ["linkedin", "LinkedIn", links.linkedin, LinkedInIcon, "cv resume"],
        ["scholar", "Google Scholar", links.scholar, ScholarIcon, "papers"],
      ] as const
    ).map<Cmd>(([id, label, url, icon, extra]) => ({
      id,
      label,
      keywords: `${label} ${extra} open profile link`,
      group: "Links",
      icon,
      hint: "new tab",
      run: () => window.open(url, "_blank", "noopener,noreferrer"),
    }));

    return [
      ...navigate,
      ...external,
      {
        id: "email",
        label: `Email ${profile.shortName.split(" ")[0]}`,
        keywords: `email mail contact write message ${links.email}`,
        group: "Links",
        icon: Mail,
        hint: "mailto",
        run: () => {
          window.location.href = `mailto:${links.email}`;
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        keywords: `copy clipboard email address ${links.email}`,
        group: "Actions",
        icon: Copy,
        hint: links.email,
        keepOpen: true,
        run: () => void copyEmail(),
      },
      {
        id: "theme",
        label: "Toggle theme",
        keywords: "theme dark light mode colour color appearance switch",
        group: "Actions",
        icon: Palette,
        hint: "dark / light",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "resume",
        label: "Download résumé",
        keywords: "resume cv curriculum vitae download pdf hire",
        group: "Actions",
        icon: Download,
        hint: `PDF · ${resume.sizeLabel}`,
        run: () => {
          // A programmatic <a download> click is the only way to name the file
          // from here; location.href would open the PDF viewer instead.
          const link = document.createElement("a");
          link.href = resume.href;
          link.download = resume.filename;
          document.body.append(link);
          link.click();
          link.remove();
        },
      },
    ];
  }, [copyEmail, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return commands;
    return commands.filter((cmd) => {
      const haystack = `${cmd.label} ${cmd.keywords}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  }, [commands, query]);

  // Derived, so a shrinking result list never needs a setState in an effect.
  const activeIndex = filtered.length
    ? Math.min(active, filtered.length - 1)
    : -1;

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, query]);

  // Close first, run second: a Navigate command needs the scroll lock lifted.
  const runCommand = (cmd: Cmd) => {
    if (!cmd.keepOpen) setPalette(false);
    cmd.run();
  };

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setPalette(false);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => {
        const total = filtered.length;
        if (total === 0) return 0;
        return (Math.min(current, total - 1) + delta + total) % total;
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runCommand(cmd);
    } else if (event.key === "Tab") {
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            aria-hidden
            onClick={() => setPalette(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-md dark:bg-black/65"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={onDialogKeyDown}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass-3 glass-edge relative w-full max-w-xl overflow-hidden"
          >
            <div className="border-edge flex items-center gap-3 border-b px-4 py-3.5">
              <Search
                aria-hidden
                strokeWidth={1.8}
                className="text-fg-subtle h-4 w-4 shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                role="combobox"
                aria-expanded
                aria-controls="command-palette-list"
                aria-activedescendant={
                  activeIndex >= 0
                    ? `command-${filtered[activeIndex].id}`
                    : undefined
                }
                aria-label="Search commands"
                placeholder="Jump to a section, link or action…"
                autoComplete="off"
                spellCheck={false}
                className="text-fg placeholder:text-fg-subtle w-full min-w-0 bg-transparent text-[15px] outline-none"
              />
              <kbd className="glass-1 text-fg-subtle hidden px-2 py-0.5 font-mono text-[10px] sm:block">
                esc
              </kbd>
            </div>

            <div
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(52vh,25rem)] overflow-y-auto overscroll-contain py-1.5"
            >
              {filtered.length === 0 ? (
                <p className="text-fg-subtle px-4 py-8 text-center text-sm">
                  No commands match that.
                </p>
              ) : (
                filtered.map((cmd, index) => {
                  const isActive = index === activeIndex;
                  const done = cmd.id === "copy-email" && copied;
                  const RowIcon = done ? Check : cmd.icon;
                  return (
                    <Fragment key={cmd.id}>
                      {cmd.group !== filtered[index - 1]?.group ? (
                        <p
                          role="presentation"
                          className="text-fg-subtle px-4 pt-3 pb-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                        >
                          {cmd.group}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        id={`command-${cmd.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive ? "true" : undefined}
                        tabIndex={-1}
                        onClick={() => runCommand(cmd)}
                        onMouseMove={() => {
                          if (!isActive) setActive(index);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 border-l-2 px-4 py-2.5 text-left text-sm transition-colors",
                          isActive
                            ? "border-l-accent text-fg bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]"
                            : "text-fg-muted border-l-transparent",
                        )}
                      >
                        <RowIcon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            done
                              ? "text-accent-3"
                              : isActive
                                ? "text-accent"
                                : "text-fg-subtle",
                          )}
                        />
                        <span className="truncate">
                          {done ? "Copied" : cmd.label}
                        </span>
                        {cmd.hint ? (
                          <span className="text-fg-subtle ml-auto max-w-[45%] shrink-0 truncate font-mono text-[10px]">
                            {cmd.hint}
                          </span>
                        ) : null}
                      </button>
                    </Fragment>
                  );
                })
              )}
            </div>

            <div className="border-edge text-fg-subtle flex items-center gap-2.5 border-t px-4 py-2.5 font-mono text-[10px]">
              <span>↑↓ navigate</span>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1">
                <CornerDownLeft aria-hidden className="h-3 w-3" /> open
              </span>
              <span aria-hidden>·</span>
              <span>esc close</span>
              <span className="ml-auto flex items-center gap-1">
                {isMac ? (
                  <CommandKey aria-hidden className="h-3 w-3" />
                ) : (
                  <span>Ctrl</span>
                )}
                K
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
