import type { MapImageConfig } from "./types";

/**
 * The map background. To switch to the authentic in-game map:
 * 1. Add the image (with permission) and put its URL here.
 * 2. Set width/height to its exact native pixel size.
 * 3. Set isPlaceholder to false and update the attribution.
 * 4. Redraw zones and re-enter marker positions in that image's pixels.
 */
export const MAP_IMAGE: MapImageConfig = {
  url: "/map/placeholder-map.svg",
  width: 3000,
  height: 4000,
  isPlaceholder: true,
  attribution: "Placeholder map · GTA VI Guide",
};
