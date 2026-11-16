import type { MapCategoryId, MapLocation } from "./types";

/**
 * Marker data. To add a location, append one object: no map code changes needed.
 * Positions are pixels on the original map image (see config.ts).
 *
 * Everything below is PLACEHOLDER test data so filters, search and zones can be
 * exercised. None of it is a real GTA VI location. Delete these once real,
 * verified locations are entered against the authentic map image.
 */
function sample(
  id: string,
  name: string,
  category: MapCategoryId,
  zone: string,
  x: number,
  y: number,
  noun: string,
): MapLocation {
  return {
    id,
    name,
    category,
    zone,
    position: { x, y },
    description: `Placeholder ${noun} used to test the interactive map. This is not a real GTA VI location.`,
    status: "placeholder",
    sources: [],
  };
}

export const MAP_LOCATIONS: MapLocation[] = [
  sample("strip-clubs-sample-1", "Sample Strip Club 1", "strip-clubs", "zone-a", 352, 321, "strip club"),
  sample("strip-clubs-sample-2", "Sample Strip Club 2", "strip-clubs", "zone-c", 1094, 2119, "strip club"),
  sample("strip-clubs-sample-3", "Sample Strip Club 3", "strip-clubs", "zone-e", 940, 3110, "strip club"),
  sample("vehicles-sample-1", "Sample Vehicle Spawn 1", "vehicles", "zone-d", 2270, 1959, "vehicle spawn point"),
  sample("vehicles-sample-2", "Sample Vehicle Spawn 2", "vehicles", "zone-f", 2116, 2962, "vehicle spawn point"),
  sample("vehicles-sample-3", "Sample Vehicle Spawn 3", "vehicles", "zone-b", 1962, 901, "vehicle spawn point"),
  sample("safehouses-sample-1", "Sample Safehouse 1", "safehouses", "zone-a", 492, 1037, "safehouse"),
  sample("safehouses-sample-2", "Sample Safehouse 2", "safehouses", "zone-c", 1234, 2039, "safehouse"),
  sample("safehouses-sample-3", "Sample Safehouse 3", "safehouses", "zone-e", 1080, 3036, "safehouse"),
  sample("missions-sample-1", "Sample Mission Start 1", "missions", "zone-d", 2410, 1879, "mission start point"),
  sample("missions-sample-2", "Sample Mission Start 2", "missions", "zone-f", 2256, 2888, "mission start point"),
  sample("missions-sample-3", "Sample Mission Start 3", "missions", "zone-b", 2102, 827, "mission start point"),
  sample("restaurants-sample-1", "Sample Restaurant 1", "restaurants", "zone-a", 632, 963, "restaurant"),
  sample("restaurants-sample-2", "Sample Restaurant 2", "restaurants", "zone-c", 478, 1959, "restaurant"),
  sample("restaurants-sample-3", "Sample Restaurant 3", "restaurants", "zone-e", 1220, 2962, "restaurant"),
  sample("shops-sample-1", "Sample Shop 1", "shops", "zone-d", 2550, 1799, "shop"),
  sample("shops-sample-2", "Sample Shop 2", "shops", "zone-f", 2396, 3603, "shop"),
  sample("shops-sample-3", "Sample Shop 3", "shops", "zone-b", 2242, 753, "shop"),
  sample("collectibles-sample-1", "Sample Collectible 1", "collectibles", "zone-a", 772, 889, "collectible"),
  sample("collectibles-sample-2", "Sample Collectible 2", "collectibles", "zone-c", 618, 1879, "collectible"),
  sample("collectibles-sample-3", "Sample Collectible 3", "collectibles", "zone-e", 464, 2888, "collectible"),
  sample("weapons-sample-1", "Sample Weapon Pickup 1", "weapons", "zone-d", 1794, 1719, "weapon pickup"),
  sample("weapons-sample-2", "Sample Weapon Pickup 2", "weapons", "zone-f", 2536, 3529, "weapon pickup"),
  sample("weapons-sample-3", "Sample Weapon Pickup 3", "weapons", "zone-b", 2382, 679, "weapon pickup"),
  sample("interesting-sample-1", "Sample Point of Interest 1", "interesting", "zone-a", 912, 815, "point of interest"),
  sample("interesting-sample-2", "Sample Point of Interest 2", "interesting", "zone-c", 758, 1799, "point of interest"),
  sample("interesting-sample-3", "Sample Point of Interest 3", "interesting", "zone-e", 604, 3603, "point of interest"),
];
