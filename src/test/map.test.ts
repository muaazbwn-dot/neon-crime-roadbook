import { describe, expect, it } from "vitest";

import { categoryCounts, searchLocations, visibleLocations } from "@/content/map/filter";
import { fromLatLng, imageBounds, isInsidePolygon, toLatLng } from "@/content/map/geometry";
import { mapDataSync } from "@/content/map/repository";
import type { MapCategoryId, MapData } from "@/content/map/types";
import { validateMapData } from "@/content/map/validation";

const data = mapDataSync();

describe("Map data", () => {
  it("passes validation", () => {
    expect(validateMapData(data)).toEqual([]);
  });

  it("has the nine requested marker categories", () => {
    expect(data.categories.map((c) => c.label)).toEqual([
      "Strip Clubs",
      "Vehicles",
      "Safehouses",
      "Missions",
      "Restaurants",
      "Shops",
      "Collectibles",
      "Weapons",
      "Interesting Locations",
    ]);
  });

  it("marks every marker as placeholder while the placeholder image is used", () => {
    expect(data.image.isPlaceholder).toBe(true);
    expect(data.locations.every((l) => l.status === "placeholder")).toBe(true);
  });

  it("rejects a real location on the placeholder image", () => {
    const withReal: MapData = {
      ...data,
      locations: [
        { ...data.locations[0]!, id: "real-one", status: "official", description: "Real place." },
      ],
    };
    expect(validateMapData(withReal).join(" ")).toMatch(/authentic map image/);
  });

  it("rejects a location outside its zone", () => {
    const moved: MapData = {
      ...data,
      locations: [{ ...data.locations[0]!, zone: "zone-f" }],
    };
    expect(validateMapData(moved).join(" ")).toMatch(/not inside zone/);
  });
});

describe("Category filters", () => {
  const only = (ids: MapCategoryId[]) =>
    visibleLocations(data.locations, { categories: new Set(ids), zoneId: null });

  it("shows every marker for All Locations", () => {
    expect(visibleLocations(data.locations, { categories: new Set(), zoneId: null })).toHaveLength(
      data.locations.length,
    );
  });

  it("shows only strip clubs when Strip Clubs is selected", () => {
    const result = only(["strip-clubs"]);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((l) => l.category === "strip-clubs")).toBe(true);
  });

  it("combines several selected categories", () => {
    const result = only(["strip-clubs", "weapons"]);
    expect(new Set(result.map((l) => l.category))).toEqual(new Set(["strip-clubs", "weapons"]));
  });

  it("limits markers to the selected region", () => {
    const result = visibleLocations(data.locations, { categories: new Set(), zoneId: "zone-a" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((l) => l.zone === "zone-a")).toBe(true);
    expect(Object.values(categoryCounts(data.locations, "zone-a")).reduce((a, b) => a + b, 0)).toBe(result.length);
  });
});

describe("Search", () => {
  it("finds a location by name, best match first", () => {
    expect(searchLocations(data, "sample strip club 2")[0]?.id).toBe("strip-clubs-sample-2");
  });

  it("matches category names and ignores case", () => {
    expect(searchLocations(data, "SAFEHOUSE").every((l) => l.category === "safehouses")).toBe(true);
  });

  it("returns nothing for an empty query", () => {
    expect(searchLocations(data, "   ")).toEqual([]);
  });
});

describe("Coordinates", () => {
  it("converts image pixels to map coordinates and back", () => {
    const [lat, lng] = toLatLng({ x: 1234, y: 2345 }, data.image);
    expect(fromLatLng(lat, lng, data.image)).toEqual({ x: 1234, y: 2345 });
  });

  it("keeps the image's aspect ratio (no distortion)", () => {
    const [[south, west], [north, east]] = imageBounds(data.image);
    expect((east - west) / (north - south)).toBeCloseTo(data.image.width / data.image.height);
  });

  it("detects points inside a polygon", () => {
    const square = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
    ];
    expect(isInsidePolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(isInsidePolygon({ x: 15, y: 5 }, square)).toBe(false);
  });
});
