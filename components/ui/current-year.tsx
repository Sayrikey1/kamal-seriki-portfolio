"use client";

import { useSyncExternalStore } from "react";

/** The clock never changes mid-session, so nothing needs to be notified. */
const subscribe = () => () => {};

/** Primitive return value, so it is a stable snapshot across calls. */
const getSnapshot = () => new Date().getFullYear();

/**
 * Self-correcting copyright year.
 *
 * Every route here is statically prerendered, so a `new Date()` evaluated in a
 * Server Component freezes at build time and reads the wrong year until the
 * next deploy.
 *
 * useSyncExternalStore is the sanctioned way to hold a value that legitimately
 * differs between server and client: React renders the server snapshot (the
 * build year) during SSR and hydration, so the trees match, then re-reads the
 * client snapshot afterwards. Reading the date during the first render would
 * mismatch; setting state in an effect would do the same job less honestly.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, getSnapshot, () => buildYear);

  return <>{year}</>;
}
