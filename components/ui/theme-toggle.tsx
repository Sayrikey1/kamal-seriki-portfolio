"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme switch.
 *
 * Which icon shows is decided by CSS via the `dark:` variant rather than React
 * state. next-themes writes the theme class before hydration, so the correct
 * icon is painted on the first frame with no mounted-flag dance and no
 * hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "glass-1 text-fg-muted hover:text-fg grid h-9 w-9 place-items-center transition-colors",
        className,
      )}
    >
      <Sun
        aria-hidden
        className="absolute h-4 w-4 scale-100 opacity-100 transition-all duration-300 dark:scale-50 dark:opacity-0"
        strokeWidth={1.8}
      />
      <Moon
        aria-hidden
        className="absolute h-4 w-4 scale-50 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100"
        strokeWidth={1.8}
      />
    </button>
  );
}
