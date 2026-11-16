import type { ImagePoint, MapImageConfig } from "./types";

/**
 * Image pixels <-> Leaflet CRS.Simple coordinates.
 * The whole image is scaled to fit a 256-unit world, so zoom 0 shows it in one tile
 * and the native resolution is reached at nativeZoom(image).
 */
export function mapScale(image: Pick<MapImageConfig, "width" | "height">): number {
  return 256 / Math.max(image.width, image.height);
}

export function toLatLng(point: ImagePoint, image: Pick<MapImageConfig, "width" | "height">): [number, number] {
  const s = mapScale(image);
  return [-point.y * s, point.x * s];
}

export function fromLatLng(
  lat: number,
  lng: number,
  image: Pick<MapImageConfig, "width" | "height">,
): ImagePoint {
  const s = mapScale(image);
  return { x: Math.round(lng / s), y: Math.round(-lat / s) };
}

export function imageBounds(image: Pick<MapImageConfig, "width" | "height">): [[number, number], [number, number]] {
  const s = mapScale(image);
  return [
    [-image.height * s, 0],
    [0, image.width * s],
  ];
}

/** Zoom level at which one image pixel equals one screen pixel. */
export function nativeZoom(image: Pick<MapImageConfig, "width" | "height">): number {
  return Math.log2(Math.max(image.width, image.height) / 256);
}

export function isInsideImage(point: ImagePoint, image: Pick<MapImageConfig, "width" | "height">): boolean {
  return point.x >= 0 && point.y >= 0 && point.x <= image.width && point.y <= image.height;
}

/** Ray-casting point-in-polygon test, in image pixels. */
export function isInsidePolygon(point: ImagePoint, polygon: ImagePoint[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]!;
    const b = polygon[j]!;
    const crosses = a.y > point.y !== b.y > point.y;
    if (crosses && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}
