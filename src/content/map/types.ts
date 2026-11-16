import type { ContentStatus } from "../status";
import type { Source } from "../types";

/** Pixel position on the ORIGINAL map image (x to the right, y downward, origin top-left). */
export interface ImagePoint {
  x: number;
  y: number;
}

export interface MapImageConfig {
  /** Public URL of the full-resolution map image. */
  url: string;
  /** Native pixel size of that image. Every coordinate is relative to it. */
  width: number;
  height: number;
  /** True while a stand-in image is used. Only placeholder markers are allowed then. */
  isPlaceholder: boolean;
  /** Credit shown in the map corner (owner + permission). */
  attribution: string;
}

export type MapCategoryId =
  | "strip-clubs"
  | "vehicles"
  | "safehouses"
  | "missions"
  | "restaurants"
  | "shops"
  | "collectibles"
  | "weapons"
  | "interesting";

export type MapIconKey =
  | "martini"
  | "car"
  | "house"
  | "flag"
  | "utensils"
  | "bag"
  | "gem"
  | "crosshair"
  | "sparkles";

export interface MapCategory {
  id: MapCategoryId;
  label: string;
  /** Name of the colour token in styles.css, e.g. "--map-cat-vehicles". */
  colorToken: `--map-cat-${string}`;
  icon: MapIconKey;
}

export interface MapZone {
  id: string;
  name: string;
  /** Polygon outline in image pixels, clockwise. */
  outline: ImagePoint[];
  isPlaceholder: boolean;
}

export interface MapLocation {
  id: string;
  name: string;
  category: MapCategoryId;
  zone: string;
  position: ImagePoint;
  description: string;
  /** "placeholder" marks test data that is NOT a real GTA VI location. */
  status: ContentStatus | "placeholder";
  sources: Source[];
  image?: { src: string; alt: string; width: number; height: number; credit?: string };
}

export interface MapData {
  image: MapImageConfig;
  categories: MapCategory[];
  zones: MapZone[];
  locations: MapLocation[];
}
