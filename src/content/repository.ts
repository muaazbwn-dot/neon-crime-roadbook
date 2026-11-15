/**
 * Content repository: the only module pages use to read content.
 * Today it reads typed local records; later it can be swapped for database queries
 * without touching routes or components (keep the async signatures).
 */
import { COLLECTIONS } from "./collections";
import { characters } from "./data/characters";
import { cheats, collectibles, guides, missions, news, vehicles, weapons } from "./data/empty";
import { locations } from "./data/locations";
import type { CollectionKey, ContentEntry } from "./types";

const DATA: Record<CollectionKey, ContentEntry[]> = {
  vehicles,
  missions,
  locations,
  weapons,
  cheats,
  collectibles,
  characters,
  guides,
  news,
};

/** Published (non-draft) records, sorted by sortOrder then name. Synchronous for route static data. */
export function publishedEntries(collection: CollectionKey): ContentEntry[] {
  return DATA[collection]
    .filter((entry) => !entry.draft)
    .sort(
      (a, b) =>
        (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
        a.name.localeCompare(b.name),
    );
}

export function findPublishedEntry(collection: CollectionKey, slug: string): ContentEntry | null {
  return publishedEntries(collection).find((entry) => entry.slug === slug) ?? null;
}

/** Whether a section is visible on the public website (see COLLECTIONS[...].launched). */
export function isCollectionLaunched(collection: CollectionKey): boolean {
  return COLLECTIONS[collection].launched;
}

/** A section hub is indexable only when launched and listing at least one published record. */
export function isCollectionIndexable(collection: CollectionKey): boolean {
  return isCollectionLaunched(collection) && publishedEntries(collection).length > 0;
}

/** A record page is indexable when its section is launched, it has its own page, and editors did not flag it noindex. */
export function isEntryIndexable(entry: ContentEntry): boolean {
  const config = COLLECTIONS[entry.collection];
  return config.launched && config.detailPath !== undefined && !entry.noindex && !entry.draft;
}

export async function listEntries(collection: CollectionKey): Promise<ContentEntry[]> {
  return publishedEntries(collection);
}

export async function getEntryWithRelated(
  collection: CollectionKey,
  slug: string,
): Promise<{ entry: ContentEntry; related: ContentEntry[] } | null> {
  const entry = findPublishedEntry(collection, slug);
  if (!entry) return null;
  const explicit = (entry.related ?? [])
    .filter((ref) => isCollectionLaunched(ref.collection))
    .map((ref) => findPublishedEntry(ref.collection, ref.slug))
    .filter((e): e is ContentEntry => e !== null);
  // Fall back to siblings in the same section so every page links onward.
  const siblings = publishedEntries(collection).filter((e) => e.slug !== slug);
  const related = [...explicit, ...siblings.filter((s) => !explicit.includes(s))].slice(0, 6);
  return { entry, related };
}

export function allPublishedEntries(): ContentEntry[] {
  return (Object.keys(DATA) as CollectionKey[]).flatMap(publishedEntries);
}
