import type { CollectionEntry } from "astro:content";

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const d = new Date(value as any);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getFormattedDate(date: unknown): string {
  const d = toDate(date);
  // If it can't be parsed, just show an empty string instead of throwing
  if (!d) return "";
  // Simple ISO date (YYYY‑MM‑DD); change to whatever format you like
  return d.toISOString().slice(0, 10);
}

export function collectionDateSort(
  a: CollectionEntry<"post" | "notes">,
  b: CollectionEntry<"post" | "notes">
) {
  const da = toDate(a.data.publishDate as unknown);
  const db = toDate(b.data.publishDate as unknown);
  const ta = da?.getTime() ?? 0;
  const tb = db?.getTime() ?? 0;
  return tb - ta;
}
