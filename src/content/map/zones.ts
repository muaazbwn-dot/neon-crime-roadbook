import type { MapZone } from "./types";

/**
 * PLACEHOLDER zones: an even 2×3 grid over the placeholder image. They are not the
 * real regions of Leonida. Replace with outlines traced on the authentic map image.
 */
function rect(id: string, name: string, x1: number, y1: number, x2: number, y2: number): MapZone {
  return {
    id,
    name,
    isPlaceholder: true,
    outline: [
      { x: x1, y: y1 },
      { x: x2, y: y1 },
      { x: x2, y: y2 },
      { x: x1, y: y2 },
    ],
  };
}

export const MAP_ZONES: MapZone[] = [
  rect("zone-a", "Placeholder Zone A", 100, 100, 1500, 1333),
  rect("zone-b", "Placeholder Zone B", 1500, 100, 2900, 1333),
  rect("zone-c", "Placeholder Zone C", 100, 1333, 1500, 2666),
  rect("zone-d", "Placeholder Zone D", 1500, 1333, 2900, 2666),
  rect("zone-e", "Placeholder Zone E", 100, 2666, 1500, 3900),
  rect("zone-f", "Placeholder Zone F", 1500, 2666, 2900, 3900),
];
