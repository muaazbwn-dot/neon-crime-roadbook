/**
 * Leaflet map surface. Browser-only: load it with React.lazy behind <ClientOnly>,
 * never import it statically from a route.
 */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { fromLatLng, imageBounds, nativeZoom, toLatLng } from "@/content/map/geometry";
import type { ImagePoint, MapData, MapLocation } from "@/content/map/types";

import { MAP_ICONS } from "./category-icons";
import { PopupCard } from "./PopupCard";

export type MapCommand =
  | { type: "location"; id: string; n: number }
  | { type: "zone"; id: string; n: number }
  | { type: "full"; n: number };

export interface LeafletCanvasProps {
  data: MapData;
  /** Markers to show (already filtered). */
  locations: MapLocation[];
  selectedId: string | null;
  zoneId: string | null;
  command: MapCommand | null;
  onSelect: (id: string | null) => void;
  onViewDetails: (id: string) => void;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LeafletCanvas(props: LeafletCanvasProps) {
  const { data, locations, selectedId, zoneId, command } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const spritesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const zonesRef = useRef(new Map<string, L.Polygon>());
  const popupRef = useRef<{ popup: L.Popup; root: Root } | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const [cursor, setCursor] = useState<ImagePoint | null>(null);
  const [copied, setCopied] = useState(false);

  // Create the map once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { image, zones } = latest.current.data;
    const bounds = L.latLngBounds(imageBounds(image));

    const map = L.map(container, {
      crs: L.CRS.Simple,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 120,
      maxBounds: bounds.pad(1),
      maxBoundsViscosity: 0.8,
      maxZoom: nativeZoom(image) + 1,
      minZoom: -4,
      keyboard: true,
    });
    map.attributionControl.setPrefix(false);
    L.imageOverlay(image.url, bounds, {
      attribution: image.attribution,
      alt: image.isPlaceholder ? "Placeholder map grid" : "Map of Leonida",
      className: "map-image",
    }).addTo(map);
    map.fitBounds(bounds);
    map.setMinZoom(map.getZoom() - 0.5);

    for (const zone of zones) {
      const polygon = L.polygon(
        zone.outline.map((p) => toLatLng(p, image)),
        { className: "map-zone", interactive: false, weight: 2 },
      ).addTo(map);
      polygon.bindTooltip(zone.name, { permanent: true, direction: "center", className: "map-zone-label" });
      zonesRef.current.set(zone.id, polygon);
    }

    markerLayerRef.current = L.layerGroup().addTo(map);

    const popupEl = document.createElement("div");
    const root = createRoot(popupEl);
    const popup = L.popup({ minWidth: 272, maxWidth: 272, offset: [0, -12], autoPanPadding: [24, 24] }).setContent(popupEl);
    popupRef.current = { popup, root };
    map.on("popupclose", () => latest.current.onSelect(null));

    let frame = 0;
    map.on("mousemove", (e: L.LeafletMouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCursor(fromLatLng(e.latlng.lat, e.latlng.lng, image)));
    });
    map.on("mouseout", () => setCursor(null));
    // Editors: Alt/Option + click copies the pixel position for locations.ts.
    map.on("click", (e: L.LeafletMouseEvent) => {
      if (!e.originalEvent.altKey) return;
      const p = fromLatLng(e.latlng.lat, e.latlng.lng, image);
      void navigator.clipboard?.writeText(`{ x: ${p.x}, y: ${p.y} }`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    });

    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    mapRef.current = map;

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
      zonesRef.current.clear();
      popupRef.current = null;
      setTimeout(() => root.unmount(), 0);
    };
  }, []);

  // Keep markers in sync with the filtered list.
  useEffect(() => {
    const layer = markerLayerRef.current;
    const sprites = spritesRef.current;
    if (!layer || !sprites) return;
    const { image, categories } = data;
    const byId = new Map(categories.map((c) => [c.id, c]));
    const wanted = new Set(locations.map((l) => l.id));

    for (const [id, marker] of markersRef.current) {
      if (!wanted.has(id)) {
        layer.removeLayer(marker);
        markersRef.current.delete(id);
      }
    }
    for (const location of locations) {
      if (markersRef.current.has(location.id)) continue;
      const category = byId.get(location.category);
      if (!category) continue;
      const svg = sprites.querySelector(`[data-icon="${category.icon}"]`)?.innerHTML ?? "";
      const icon = L.divIcon({
        className: "map-pin-wrapper",
        html: `<span class="map-pin" style="--pin: var(${category.colorToken})" data-selected="false">${svg}</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const marker = L.marker(toLatLng(location.position, image), {
        icon,
        title: `${location.name} (${category.label})`,
        alt: location.name,
        keyboard: true,
        riseOnHover: true,
      });
      marker.on("click", () => latest.current.onSelect(location.id));
      marker.addTo(layer);
      markersRef.current.set(location.id, marker);
    }
  }, [data, locations]);

  // Highlight the selected marker and show its popup.
  useEffect(() => {
    const map = mapRef.current;
    const popupState = popupRef.current;
    if (!map || !popupState) return;

    for (const [id, marker] of markersRef.current) {
      marker.getElement()?.querySelector(".map-pin")?.setAttribute("data-selected", String(id === selectedId));
      marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    }

    const marker = selectedId ? markersRef.current.get(selectedId) : undefined;
    const location = selectedId ? locations.find((l) => l.id === selectedId) : undefined;
    if (!marker || !location) {
      if (map.hasLayer(popupState.popup)) map.closePopup(popupState.popup);
      return;
    }
    const category = data.categories.find((c) => c.id === location.category)!;
    const zone = data.zones.find((z) => z.id === location.zone);
    popupState.root.render(
      <PopupCard
        location={location}
        category={category}
        zone={zone}
        onViewDetails={() => latest.current.onViewDetails(location.id)}
        onLayout={() => {
          // Open (or refresh) only once the content is rendered, so auto-pan uses its real size.
          if (!map.hasLayer(popupState.popup)) popupState.popup.openOn(map);
          else popupState.popup.update();
        }}
      />,
    );
    popupState.popup.setLatLng(marker.getLatLng());
  }, [data, locations, selectedId]);

  // Highlight the selected zone.
  useEffect(() => {
    for (const [id, polygon] of zonesRef.current) {
      const el = polygon.getElement();
      el?.classList.toggle("map-zone--active", id === zoneId);
      el?.classList.toggle("map-zone--dim", zoneId !== null && id !== zoneId);
    }
  }, [zoneId]);

  // Camera moves requested by the sidebar (search, regions, full map).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !command) return;
    const animate = !prefersReducedMotion();
    const opts = { animate, duration: 0.8 };
    if (command.type === "full") {
      map.flyToBounds(imageBounds(data.image), opts);
    } else if (command.type === "zone") {
      const polygon = zonesRef.current.get(command.id);
      if (polygon) map.flyToBounds(polygon.getBounds(), { ...opts, padding: [24, 24] });
    } else {
      const location = data.locations.find((l) => l.id === command.id);
      if (location) {
        const zoom = Math.max(map.getZoom(), nativeZoom(data.image) - 0.75);
        map.flyTo(toLatLng(location.position, data.image), zoom, opts);
      }
    }
  }, [command, data]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="gta-map h-full w-full"
        role="application"
        aria-label="Interactive map. Drag to pan, use the zoom buttons or scroll to zoom. Markers are focusable with the Tab key."
      />
      <div ref={spritesRef} hidden>
        {data.categories.map((category) => {
          const Icon = MAP_ICONS[category.icon];
          return (
            <span key={category.id} data-icon={category.icon}>
              <Icon />
            </span>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 z-[1000] hidden rounded-sm bg-background/80 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground sm:block"
      >
        {copied ? "Copied" : cursor ? `x ${cursor.x} · y ${cursor.y}` : "x — · y —"}
      </div>
    </div>
  );
}
