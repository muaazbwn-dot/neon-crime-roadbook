import { SourceList } from "@/components/content/SourceList";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { MapData, MapLocation } from "@/content/map/types";

import { CategoryGlyph, LocationImage, MapStatusBadge } from "./category-icons";

/** Full details for one location, shown in a side sheet. */
export function LocationDetails({ data, location }: { data: MapData; location: MapLocation }) {
  const category = data.categories.find((c) => c.id === location.category)!;
  const zone = data.zones.find((z) => z.id === location.zone);
  return (
    <div className="flex flex-col gap-5">
      <SheetHeader className="space-y-3 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryGlyph category={category} />
          <span className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: `var(${category.colorToken})` }}>
            {category.label}
          </span>
        </div>
        <SheetTitle className="font-heading text-4xl leading-none">{location.name}</SheetTitle>
        <SheetDescription asChild>
          <div>
            <MapStatusBadge status={location.status} />
          </div>
        </SheetDescription>
      </SheetHeader>

      <LocationImage location={location} />

      <p className="text-sm leading-relaxed text-muted-foreground">{location.description}</p>

      <dl className="divide-y divide-border rounded-lg border border-border text-sm">
        <div className="flex justify-between gap-4 p-3">
          <dt className="text-muted-foreground">Region</dt>
          <dd className="text-right">{zone?.name ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <dt className="text-muted-foreground">Map position</dt>
          <dd className="font-mono text-xs">
            x {location.position.x} · y {location.position.y}
          </dd>
        </div>
      </dl>

      <section aria-labelledby="loc-sources">
        <h3 id="loc-sources" className="eyebrow">
          Sources
        </h3>
        <div className="mt-3">
          {location.sources.length > 0 ? (
            <SourceList sources={location.sources} />
          ) : (
            <p className="text-sm text-muted-foreground">
              {location.status === "placeholder"
                ? "None. This is placeholder data used to test the map and will be replaced with verified locations."
                : "No sources listed yet."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
