import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { searchLocations } from "@/content/map/filter";
import type { MapData, MapLocation } from "@/content/map/types";

import { CategoryGlyph } from "./category-icons";

/** Location search with a results list. Picking a result focuses its marker. */
export function MapSearch({ data, onPick }: { data: MapData; onPick: (location: MapLocation) => void }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchLocations(data, query), [data, query]);
  const categories = useMemo(() => new Map(data.categories.map((c) => [c.id, c])), [data.categories]);
  const zones = useMemo(() => new Map(data.zones.map((z) => [z.id, z])), [data.zones]);

  const pick = (location: MapLocation) => {
    setQuery(location.name);
    setOpen(false);
    onPick(location);
  };

  const showList = open && query.trim().length > 0;

  return (
    <div className="relative w-full">
      <label htmlFor={`${id}-input`} className="sr-only">
        Search map locations
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id={`${id}-input`}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        placeholder="Search locations…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            pick(results[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-cyan focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
      {showList && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Matching locations"
          className="absolute inset-x-0 top-full z-[1100] mt-1 max-h-80 overflow-auto rounded-md border border-border bg-popover p-1 shadow-glow-cyan"
        >
          {results.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-muted-foreground" role="option" aria-selected="false" aria-disabled="true">
              No locations match “{query}”
            </li>
          ) : (
            results.map((location, index) => {
              const category = categories.get(location.category)!;
              return (
                <li
                  key={location.id}
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => pick(location)}
                  className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 aria-selected:bg-accent"
                >
                  <CategoryGlyph category={category} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground">{location.name}</span>
                    <span className="block truncate font-mono text-[0.65rem] text-muted-foreground">
                      {category.label} · {zones.get(location.zone)?.name}
                    </span>
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
