import type { MapData, MapLocation } from "@/content/map/types";

import { CategoryGlyph } from "./category-icons";

/** Text list of the markers currently on the map (also the keyboard/screen-reader route). */
export function LocationList({
  data,
  locations,
  selectedId,
  onPick,
}: {
  data: MapData;
  locations: MapLocation[];
  selectedId: string | null;
  onPick: (location: MapLocation) => void;
}) {
  const categories = new Map(data.categories.map((c) => [c.id, c]));
  const zones = new Map(data.zones.map((z) => [z.id, z]));
  return (
    <section aria-labelledby="map-list-heading">
      <h2 id="map-list-heading" className="eyebrow">
        {locations.length} {locations.length === 1 ? "location" : "locations"} shown
      </h2>
      {locations.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No locations match these filters.</p>
      ) : (
        <ul className="mt-3 space-y-1">
          {[...locations]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  aria-current={location.id === selectedId ? "true" : undefined}
                  onClick={() => onPick(location)}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent aria-[current=true]:bg-surface-raised"
                >
                  <CategoryGlyph category={categories.get(location.category)!} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground">{location.name}</span>
                    <span className="block truncate font-mono text-[0.65rem] text-muted-foreground">
                      {zones.get(location.zone)?.name}
                    </span>
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
