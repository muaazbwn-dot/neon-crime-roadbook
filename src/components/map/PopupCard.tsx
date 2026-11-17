import { ArrowRight } from "lucide-react";
import { useLayoutEffect } from "react";

import type { MapCategory, MapLocation, MapZone } from "@/content/map/types";

import { LocationImage, MapStatusBadge } from "./category-icons";

interface PopupCardProps {
  location: MapLocation;
  category: MapCategory;
  zone: MapZone | undefined;
  onViewDetails: () => void;
  /** Called after each render so the map popup can resize to fit. */
  onLayout: () => void;
}

/** Content of the marker popup. Rendered in its own React root inside Leaflet's popup. */
export function PopupCard({ location, category, zone, onViewDetails, onLayout }: PopupCardProps) {
  useLayoutEffect(() => onLayout());
  return (
    <div className="flex flex-col">
      <LocationImage location={location} compact className="rounded-b-none [&_img]:rounded-b-none" />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
            style={{ color: `var(${category.colorToken})` }}
          >
            {category.label}
          </span>
          <MapStatusBadge status={location.status} />
        </div>
        <h3 className="font-heading text-2xl leading-none text-foreground">{location.name}</h3>
        {zone && <p className="font-mono text-[0.7rem] text-muted-foreground">{zone.name}</p>}
        <p className="text-sm text-muted-foreground">{location.description}</p>
        <button
          type="button"
          onClick={onViewDetails}
          className="mt-1 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View details <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}
