"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { links, sections } from "@/data/links";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GitHubIcon } from "@/components/ui/brand-icons";

export function SiteNav() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Active section: cheapest correct approach, and it costs nothing on scroll.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            // Tier 3 glass with refraction — one of the three refracting surfaces.
            "glass-3 glass-refract glass-edge relative flex w-full max-w-4xl items-center gap-2 overflow-hidden px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled ? "shadow-[var(--glass-drop-lg)]" : "shadow-none",
          )}
        >
          <span aria-hidden className="refract-layer" />

          <a
            href="#hero"
            className="font-display relative z-[1] flex items-center gap-2 pr-2 pl-1 text-sm font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="h-6 w-6 rounded-lg bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] shadow-[0_0_18px_-2px_var(--accent)]"
            />
            <span className="hidden sm:inline">{profile.shortName}</span>
            <span className="sm:hidden">Kamal</span>
          </a>

          <ul className="relative z-[1] mx-auto hidden items-center gap-0.5 lg:flex">
            {sections
              .filter((section) => section.id !== "hero")
              .map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={active === section.id ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3 py-1.5 text-[13px] transition-colors",
                      active === section.id
                        ? "text-fg"
                        : "text-fg-subtle hover:text-fg",
                    )}
                  >
                    {active === section.id ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : null}
                    {section.label}
                  </a>
                </li>
              ))}
          </ul>

          <div className="relative z-[1] ml-auto flex items-center gap-1.5 lg:ml-0">
            {/* The palette listens for clicks on [data-command-palette], so this
                needs no wiring beyond the attribute. */}
            <button
              type="button"
              data-command-palette
              aria-label="Open command palette. Keyboard shortcut: Command or Control plus K"
              title="Command palette (⌘K)"
              className="glass-1 text-fg-muted hover:text-fg grid h-9 w-9 place-items-center transition-colors"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden />
            </button>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="glass-1 text-fg-muted hover:text-fg grid h-9 w-9 place-items-center transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="glass-1 text-fg-muted hover:text-fg grid h-9 w-9 place-items-center transition-colors lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              className="glass-3 absolute inset-x-4 top-4 overflow-hidden p-5"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-sm font-semibold">
                  {profile.shortName}
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="glass-1 text-fg-muted grid h-9 w-9 place-items-center"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
              <ul className="flex flex-col">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "border-edge flex items-center justify-between border-b py-3 text-base transition-colors last:border-0",
                        active === section.id ? "text-accent" : "text-fg-muted",
                      )}
                    >
                      {section.label}
                      <span className="text-fg-subtle font-mono text-[10px]">
                        {String(sections.indexOf(section) + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
