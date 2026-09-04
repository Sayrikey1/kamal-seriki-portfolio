import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministically pick an index from a string, so a company name always maps
 * to the same monogram colour without storing a colour per entry.
 */
export function hashIndex(input: string, buckets: number) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % buckets;
}

/** "ABC Corp" -> "AC", "Qoryx" -> "Q" */
export function monogram(name: string) {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0]!.slice(0, 1).toUpperCase();
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2025-10" -> "Oct 2025"; "present" -> "Present" */
export function formatMonth(value: string) {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;
  if (!year || Number.isNaN(monthIndex) || !MONTHS[monthIndex]) return value;
  return `${MONTHS[monthIndex]} ${year}`;
}

/** "2025-10" + "present" -> "Oct 2025 — Present" */
export function formatDateRange(start: string, end: string) {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}
