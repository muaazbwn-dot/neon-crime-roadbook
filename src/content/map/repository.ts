/**
 * Map data access. Routes and components read map data only through here,
 * so the local files can later be replaced by database queries.
 */
import { MAP_CATEGORIES } from "./categories";
import { MAP_IMAGE } from "./config";
import { MAP_LOCATIONS } from "./locations";
import type { MapData } from "./types";
import { MAP_ZONES } from "./zones";

export function mapDataSync(): MapData {
  return { image: MAP_IMAGE, categories: MAP_CATEGORIES, zones: MAP_ZONES, locations: MAP_LOCATIONS };
}

export async function getMapData(): Promise<MapData> {
  return mapDataSync();
}
