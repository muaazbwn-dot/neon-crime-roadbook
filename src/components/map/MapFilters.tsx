import { Check, Layers, Map as MapIcon, RotateCcw } from "lucide-react";

import type { MapCategoryId, MapData } from "@/content/map/types";
import { cn } from "@/lib/utils";

import { CategoryGlyph } from "./category-icons";

interface MapFiltersProps {
  data: MapData;
  selectedCategories: ReadonlySet<MapCategoryId>;
  counts: Partial<Record<MapCategoryId, number>>;
  zoneId: string | null;
  onToggleCategory: (id: MapCategoryId) => void;
  onSelectAll: () => void;
  onSelectZone: (id: string | null) => void;
  onClear: () => void;
}

const rowClass =
  "flex w-full items-center gap-3 rounded-md border border-transparent px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent aria-pressed:border-border aria-pressed:bg-surface-raised";

export function MapFilters({
  data,
  selectedCategories,
  counts,
  zoneId,
  onToggleCategory,
  onSelectAll,
  onSelectZone,
  onClear,
}: MapFiltersProps) {
  const total = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
  const allActive = selectedCategories.size === 0;
  const hasFilters = !allActive || zoneId !== null;

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="map-cat-heading">
        <div className="flex items-center justify-between">
          <h2 id="map-cat-heading" className="eyebrow">
            Categories
          </h2>
          <span className="font-mono text-[0.65rem] text-muted-foreground">Select several</span>
        </div>
        <ul className="mt-3 space-y-1">
          <li>
            <button type="button" aria-pressed={allActive} onClick={onSelectAll} className={rowClass}>
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-foreground/60 bg-background"
              >
                <Layers className="size-3.5" />
              </span>
              <span className="flex-1 font-medium">All Locations</span>
              <span className="font-mono text-xs text-muted-foreground">{total}</span>
            </button>
          </li>
          {data.categories.map((category) => {
            const active = selectedCategories.has(category.id);
            return (
              <li key={category.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleCategory(category.id)}
                  className={rowClass}
                >
                  <CategoryGlyph category={category} className={cn(!allActive && !active && "opacity-45")} />
                  <span className={cn("flex-1", !allActive && !active && "text-muted-foreground")}>{category.label}</span>
                  {active && <Check aria-hidden="true" className="size-4 text-neon-cyan" />}
                  <span className="w-5 text-right font-mono text-xs text-muted-foreground">{counts[category.id] ?? 0}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="map-zone-heading">
        <h2 id="map-zone-heading" className="eyebrow">
          Regions
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-1.5">
          <li className="col-span-2">
            <button type="button" aria-pressed={zoneId === null} onClick={() => onSelectZone(null)} className={rowClass}>
              <MapIcon aria-hidden="true" className="size-4 text-neon-cyan" />
              <span className="font-medium">Full map</span>
            </button>
          </li>
          {data.zones.map((zone) => (
            <li key={zone.id}>
              <button
                type="button"
                aria-pressed={zoneId === zone.id}
                onClick={() => onSelectZone(zone.id)}
                className={cn(rowClass, "py-2 text-xs")}
              >
                {zone.name.replace(/^Placeholder /, "")}
              </button>
            </li>
          ))}
        </ul>
        {data.zones.some((z) => z.isPlaceholder) && (
          <p className="mt-2 text-xs text-muted-foreground">
            Placeholder regions. The real regions of Leonida will be traced on the authentic map.
          </p>
        )}
      </section>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasFilters}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-neon-cyan/40 text-sm font-semibold text-foreground transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw aria-hidden="true" className="size-4" /> Clear filters
      </button>
    </div>
  );
}
