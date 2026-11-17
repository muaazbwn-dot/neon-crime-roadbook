import { ClientOnly } from "@tanstack/react-router";
import { AlertTriangle, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { categoryCounts, visibleLocations } from "@/content/map/filter";
import type { MapCategoryId, MapData, MapLocation } from "@/content/map/types";

import type { MapCommand } from "./LeafletCanvas";
import { LocationDetails } from "./LocationDetails";
import { LocationList } from "./LocationList";
import { MapFilters } from "./MapFilters";
import { MapSearch } from "./MapSearch";

const LeafletCanvas = lazy(() => import("./LeafletCanvas"));

function MapLoading() {
  return (
    <div className="bg-grid flex h-full w-full items-center justify-center bg-surface">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Loading map…</span>
    </div>
  );
}

/** Interactive map: filters, regions, search and the Leaflet surface. */
export function MapExplorer({ data }: { data: MapData }) {
  const [categories, setCategories] = useState<ReadonlySet<MapCategoryId>>(() => new Set());
  const [zoneId, setZoneId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [command, setCommand] = useState<MapCommand | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const counter = useRef(0);

  const issue = useCallback((next: Omit<MapCommand, "n"> & { id?: string }) => {
    counter.current += 1;
    setCommand({ ...next, n: counter.current } as MapCommand);
  }, []);

  const visible = useMemo(
    () => visibleLocations(data.locations, { categories, zoneId }),
    [data.locations, categories, zoneId],
  );
  const counts = useMemo(() => categoryCounts(data.locations, zoneId), [data.locations, zoneId]);
  const activeZone = data.zones.find((z) => z.id === zoneId) ?? null;
  const detailsLocation = data.locations.find((l) => l.id === detailsId) ?? null;
  const filterCount = categories.size + (zoneId ? 1 : 0);

  const toggleCategory = (id: MapCategoryId) =>
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectZone = (id: string | null) => {
    setZoneId(id);
    setSelectedId(null);
    issue(id ? { type: "zone", id } : { type: "full" });
  };

  const clearFilters = () => {
    setCategories(new Set());
    setZoneId(null);
    setSelectedId(null);
    issue({ type: "full" });
  };

  /** Focus one location, widening filters if they would hide it. */
  const focusLocation = (location: MapLocation) => {
    if (categories.size > 0 && !categories.has(location.category)) {
      setCategories((prev) => new Set(prev).add(location.category));
    }
    if (zoneId !== null && zoneId !== location.zone) setZoneId(null);
    setSelectedId(location.id);
    setFiltersOpen(false);
    issue({ type: "location", id: location.id });
  };

  const filters = (
    <MapFilters
      data={data}
      selectedCategories={categories}
      counts={counts}
      zoneId={zoneId}
      onToggleCategory={toggleCategory}
      onSelectAll={() => setCategories(new Set())}
      onSelectZone={selectZone}
      onClear={clearFilters}
    />
  );
  const list = <LocationList data={data} locations={visible} selectedId={selectedId} onPick={focusLocation} />;

  return (
    <section aria-labelledby="interactive-map-heading" className="container-site py-8 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="interactive-map-heading" className="font-heading text-4xl">
          Interactive map
        </h2>
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          Showing {visible.length} of {data.locations.length} locations
          {activeZone ? ` · ${activeZone.name}` : ""}
        </p>
      </div>

      {data.image.isPlaceholder && (
        <div
          role="note"
          className="mt-4 flex items-start gap-3 rounded-lg border border-status-reported/35 bg-status-reported/10 p-4 text-sm"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-status-reported" />
          <p className="text-foreground">
            <strong className="font-semibold">Preview with placeholder data.</strong>{" "}
            <span className="text-muted-foreground">
              The background is a stand-in grid and every marker and region is sample data for testing.
              None of them are real GTA VI locations. The authentic map and verified locations will
              replace them.
            </span>
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside aria-label="Map filters" className="card-surface hidden h-[44rem] flex-col overflow-hidden lg:flex">
          <div className="border-b border-border p-4">
            <MapSearch data={data} onPick={focusLocation} />
          </div>
          <div className="flex-1 space-y-8 overflow-y-auto p-4">
            {filters}
            {list}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-3 flex gap-2 lg:hidden">
            <MapSearch data={data} onPick={focusLocation} />
            <Button variant="outlineNeon" className="h-11 shrink-0" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal aria-hidden="true" />
              Filters{filterCount > 0 ? ` (${filterCount})` : ""}
            </Button>
          </div>

          <div className="card-surface relative isolate h-[70vh] min-h-[26rem] overflow-hidden lg:h-[44rem]">
            <ClientOnly fallback={<MapLoading />}>
              <Suspense fallback={<MapLoading />}>
                <LeafletCanvas
                  data={data}
                  locations={visible}
                  selectedId={selectedId}
                  zoneId={zoneId}
                  command={command}
                  onSelect={setSelectedId}
                  onViewDetails={setDetailsId}
                />
              </Suspense>
            </ClientOnly>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-3 top-3 z-[1000] border border-border shadow-glow-cyan"
              onClick={() => selectZone(null)}
            >
              <MapIcon aria-hidden="true" /> Full map
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-xl">
          <SheetHeader className="text-left">
            <SheetTitle className="font-heading text-3xl">Filter the map</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-8 pb-4">
            {filters}
            {list}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={detailsLocation !== null} onOpenChange={(open) => !open && setDetailsId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          {detailsLocation && <LocationDetails data={data} location={detailsLocation} />}
        </SheetContent>
      </Sheet>
    </section>
  );
}
