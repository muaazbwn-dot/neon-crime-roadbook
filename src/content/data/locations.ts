import type { ContentEntry } from "../types";
import { officialProfile } from "./sources";

/**
 * Places listed on the official GTA VI website (checked 2026-11-15).
 * Summaries stay minimal until editors expand them, so detail pages are noindex for now.
 */
function place(slug: string, name: string, officialPath: string): ContentEntry {
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
  };
}

export const locations: ContentEntry[] = [
  place("vice-city", "Vice City", "vice-city"),
  place("leonida-keys", "Leonida Keys", "leonida-keys"),
  place("grassrivers", "Grassrivers", "grassrivers"),
  place("port-gellhorn", "Port Gellhorn", "port-gellhorn"),
  place("ambrosia", "Ambrosia", "ambrosia"),
  place("mount-kalaga", "Mount Kalaga", "kalaga"),
];
