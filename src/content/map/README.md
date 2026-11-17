# Interactive map data

All map content lives in this folder; the map UI (`src/components/map/`) never needs editing to add data.

| File | What it holds |
| --- | --- |
| `config.ts` | Background image URL, its native pixel size, placeholder flag, credit |
| `categories.ts` | Marker categories (label, colour token, icon) |
| `zones.ts` | Region outlines in image pixels |
| `locations.ts` | Markers |

## Coordinates
Every position is a pixel on the original map image: `x` from the left edge, `y` from the top.
Hover the map: the bottom-left readout shows the pixel under the cursor. Alt/Option + click copies it.

## Adding a location
Append one object to `MAP_LOCATIONS` with a unique id, category, zone, position, description,
status and sources. The tests reject unknown categories/zones, positions outside their zone,
real locations on the placeholder image, and sourced statuses without a source.

## Switching to the authentic map
Update `config.ts` (url, exact width/height, `isPlaceholder: false`, attribution), trace the
real region outlines in `zones.ts`, then delete the placeholder markers.
