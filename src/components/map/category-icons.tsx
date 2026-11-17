import {
  Car,
  Crosshair,
  Flag,
  Gem,
  House,
  ImageOff,
  Martini,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/content/StatusBadge";
import type { MapCategory, MapIconKey, MapLocation } from "@/content/map/types";
import { cn } from "@/lib/utils";

export const MAP_ICONS: Record<MapIconKey, LucideIcon> = {
  martini: Martini,
  car: Car,
  house: House,
  flag: Flag,
  utensils: UtensilsCrossed,
  bag: ShoppingBag,
  gem: Gem,
  crosshair: Crosshair,
  sparkles: Sparkles,
};

/** Small round category marker used in lists, matching the map pins. */
export function CategoryGlyph({ category, className }: { category: MapCategory; className?: string }) {
  const Icon = MAP_ICONS[category.icon];
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-7 shrink-0 place-items-center rounded-full border-2 bg-background", className)}
      style={{ borderColor: `var(${category.colorToken})`, color: `var(${category.colorToken})` }}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

/** Verification label for a map location, including the placeholder state. */
export function MapStatusBadge({ status }: { status: MapLocation["status"] }) {
  if (status === "placeholder") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-status-undiscovered/60 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-status-undiscovered whitespace-nowrap">
        Placeholder data
      </span>
    );
  }
  return <StatusBadge status={status} />;
}

export function LocationImage({
  location,
  className,
  compact = false,
}: {
  location: MapLocation;
  className?: string;
  /** Shorter frame for popups. */
  compact?: boolean;
}) {
  const aspect = compact ? "aspect-[2/1]" : "aspect-video";
  if (location.image) {
    return (
      <figure className={className}>
        <img
          src={location.image.src}
          alt={location.image.alt}
          width={location.image.width}
          height={location.image.height}
          loading="lazy"
          decoding="async"
          className={cn(aspect, "w-full rounded-md object-cover")}
        />
        {location.image.credit && (
          <figcaption className="mt-1 font-mono text-[0.65rem] text-muted-foreground">{location.image.credit}</figcaption>
        )}
      </figure>
    );
  }
  return (
    <div
      className={cn(
        aspect,
        "flex w-full flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <ImageOff aria-hidden="true" className="size-5" />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em]">Image coming soon</span>
    </div>
  );
}
