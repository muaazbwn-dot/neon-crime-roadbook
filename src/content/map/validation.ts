import { STATUS_META } from "../status";
import { isInsideImage, isInsidePolygon } from "./geometry";
import type { MapData } from "./types";

/** Returns problems with the map data; an empty array means it is safe to publish. */
export function validateMapData(data: MapData): string[] {
  const problems: string[] = [];
  const categoryIds = new Set(data.categories.map((c) => c.id));
  const zones = new Map(data.zones.map((z) => [z.id, z]));
  const seen = new Set<string>();

  if (data.image.width <= 0 || data.image.height <= 0) problems.push("map image needs a positive size");

  for (const zone of data.zones) {
    if (zone.outline.length < 3) problems.push(`zone ${zone.id}: outline needs at least 3 points`);
    for (const p of zone.outline) {
      if (!isInsideImage(p, data.image)) problems.push(`zone ${zone.id}: outline point outside the image`);
    }
  }

  for (const location of data.locations) {
    const where = `location ${location.id}`;
    if (seen.has(location.id)) problems.push(`${where}: duplicate id`);
    seen.add(location.id);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(location.id)) problems.push(`${where}: id must be lowercase-hyphenated`);
    if (!categoryIds.has(location.category)) problems.push(`${where}: unknown category`);
    const zone = zones.get(location.zone);
    if (!zone) problems.push(`${where}: unknown zone`);
    if (!isInsideImage(location.position, data.image)) problems.push(`${where}: position outside the image`);
    else if (zone && !isInsidePolygon(location.position, zone.outline)) {
      problems.push(`${where}: position is not inside zone ${zone.id}`);
    }
    if (location.status === "placeholder") {
      if (!/placeholder/i.test(location.description)) {
        problems.push(`${where}: placeholder descriptions must say they are placeholders`);
      }
    } else {
      if (data.image.isPlaceholder) {
        problems.push(`${where}: real locations need the authentic map image, not the placeholder`);
      }
      if (STATUS_META[location.status].requiresSource && location.sources.length === 0) {
        problems.push(`${where}: "${location.status}" locations must cite a source`);
      }
    }
  }
  return problems;
}
