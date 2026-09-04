import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ActionButton } from "@/components/ui/action-button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-svh flex-col items-center justify-center py-32">
      <GlassPanel
        tier={3}
        edge
        className="w-full max-w-xl p-8 text-center sm:p-12"
      >
        <span className="text-accent font-mono text-[11px] tracking-[0.22em] uppercase">
          Error 404
        </span>
        <h1 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="text-fg-muted mx-auto mt-4 max-w-md">
          The link may be out of date. Everything worth seeing lives on the main
          page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ActionButton href="/">Back to portfolio</ActionButton>
          <Link
            href="/#projects"
            className="glass-1 text-fg-muted hover:text-fg inline-flex items-center gap-2 px-5 py-3 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            View selected work
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
