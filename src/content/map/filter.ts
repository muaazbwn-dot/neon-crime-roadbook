import type { MapCategoryId, MapData, MapLocation } from "./types";

export interface MapFilterState {
  /** Empty set means "All Locations". */
  categories: ReadonlySet<MapCategoryId>;
  /** null means the full map. */
  zoneId: string | null;
}

/** Markers that should be on the map for the current filters. */
export function visibleLocations(locations: MapLocation[], filters: MapFilterState): MapLocation[] {
  return locations.filter(
    (location) =>
      (filters.categories.size === 0 || filters.categories.has(location.category)) &&
      (filters.zoneId === null || location.zone === filters.zoneId),
  );
}

/** Marker count per category, respecting the selected zone only. */
export function categoryCounts(locations: MapLocation[], zoneId: string | null): Record<MapCategoryId, number> {
  const counts = {} as Record<MapCategoryId, number>;
  for (const location of locations) {
    if (zoneId !== null && location.zone !== zoneId) continue;
    counts[location.category] = (counts[location.category] ?? 0) + 1;
  }
  return counts;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Search every location (ignores filters) by name, category and zone name.
 * Name-prefix matches rank first.
 */
export function searchLocations(data: MapData, query: string, limit = 8): MapLocation[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(" ");
  const categoryLabel = new Map(data.categories.map((c) => [c.id, c.label]));
  const zoneName = new Map(data.zones.map((z) => [z.id, z.name]));

  const scored: Array<{ location: MapLocation; score: number }> = [];
  for (const location of data.locations) {
    const name = normalize(location.name);
    const haystack = `${name} ${normalize(categoryLabel.get(location.category) ?? "")} ${normalize(zoneName.get(location.zone) ?? "")}`;
    if (!terms.every((term) => haystack.includes(term))) continue;
    const score = name.startsWith(q) ? 0 : name.includes(q) ? 1 : 2;
    scored.push({ location, score });
  }
  return scored
    .sort((a, b) => a.score - b.score || a.location.name.localeCompare(b.location.name))
    .slice(0, limit)
    .map((s) => s.location);
}
