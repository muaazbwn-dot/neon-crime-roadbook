import type { ContentEntry } from "../types";
import { officialProfile } from "./sources";

/**
 * Places listed on the official GTA VI website (checked 2026-11-15).
 * Summaries stay minimal until editors expand them, so detail pages are noindex for now.
 */
function place(slug: string, name: string, officialPath: string, sortOrder: number): ContentEntry {
  return {
    collection: "locations",
    slug,
    name,
    summary: `${name} is one of the places of the fictional state of Leonida presented by Rockstar Games on the official Grand Theft Auto VI website.`,
    status: "official",
    sources: [officialProfile(officialPath, name)],
    publishedOn: "2026-11-15",
    updatedOn: "2026-11-15",
    noindex: true,
    sortOrder,
  };
}

export const locations: ContentEntry[] = [
  place("vice-city", "Vice City", "vice-city", 1),
  place("leonida-keys", "Leonida Keys", "leonida-keys", 2),
  place("grassrivers", "Grassrivers", "grassrivers", 3),
  place("port-gellhorn", "Port Gellhorn", "port-gellhorn", 4),
  place("ambrosia", "Ambrosia", "ambrosia", 5),
  place("mount-kalaga", "Mount Kalaga", "kalaga", 6),
];
