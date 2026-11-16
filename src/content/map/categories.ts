import type { MapCategory } from "./types";

/** Marker categories, in filter order. Add a category here and a colour token in styles.css. */
export const MAP_CATEGORIES: MapCategory[] = [
  { id: "strip-clubs", label: "Strip Clubs", colorToken: "--map-cat-strip-clubs", icon: "martini" },
  { id: "vehicles", label: "Vehicles", colorToken: "--map-cat-vehicles", icon: "car" },
  { id: "safehouses", label: "Safehouses", colorToken: "--map-cat-safehouses", icon: "house" },
  { id: "missions", label: "Missions", colorToken: "--map-cat-missions", icon: "flag" },
  { id: "restaurants", label: "Restaurants", colorToken: "--map-cat-restaurants", icon: "utensils" },
  { id: "shops", label: "Shops", colorToken: "--map-cat-shops", icon: "bag" },
  { id: "collectibles", label: "Collectibles", colorToken: "--map-cat-collectibles", icon: "gem" },
  { id: "weapons", label: "Weapons", colorToken: "--map-cat-weapons", icon: "crosshair" },
  { id: "interesting", label: "Interesting Locations", colorToken: "--map-cat-interesting", icon: "sparkles" },
];
