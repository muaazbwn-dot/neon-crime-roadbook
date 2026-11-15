import type { CollectionKey } from "./types";

/**
 * Record-page routes that exist today. When a hidden section launches with its own
 * record pages, add its "/section/$slug" route file and extend this union.
 */
export type DetailPath = "/vehicles/$slug";

export interface CollectionConfig {
  key: CollectionKey;
  /** Public URL of the section hub (used for canonical URLs and breadcrumbs). */
  path: string;
  /**
   * Launch switch. Only launched sections get route files, navigation links and
   * sitemap entries. Unlaunched sections keep their config and data for later.
   */
  launched: boolean;
  /** Route for individual records; set only for sections with their own record pages. */
  detailPath?: DetailPath;
  label: string;
  singular: string;
  /** SEO title (site name is appended automatically). */
  title: string;
  /** Meta description: describe what the page actually contains. */
  description: string;
  /** Visible intro paragraph under the H1. */
  intro: string;
  /** True when individual records get their own /section/slug page. */
  hasDetailPages: boolean;
}

export const COLLECTIONS: Record<CollectionKey, CollectionConfig> = {
  vehicles: {
    key: "vehicles",
    launched: true,
    path: "/vehicles",
    detailPath: "/vehicles/$slug",
    label: "Vehicles",
    singular: "Vehicle",
    title: "GTA 6 Vehicles – Vehicle List and Locations",
    description:
      "Grand Theft Auto VI vehicles that can be confirmed from official material or in-game checks, each labelled by verification status with sources.",
    intro:
      "Cars, bikes, boats and aircraft in Grand Theft Auto VI. A vehicle is only listed once it appears in official material or has been checked in-game, and every spawn location is labelled with how it was verified.",
    hasDetailPages: true,
  },
  missions: {
    key: "missions",
    launched: false,
    path: "/missions",
    label: "Missions",
    singular: "Mission",
    title: "GTA 6 Missions – Story Mission List and Walkthroughs",
    description:
      "Grand Theft Auto VI story missions and walkthroughs, published only once they can be verified in the game.",
    intro:
      "Story missions, side activities and walkthroughs for Grand Theft Auto VI. Missions are added after they are played and verified; nothing is listed from rumours.",
    hasDetailPages: true,
  },
  locations: {
    key: "locations",
    launched: false,
    path: "/locations",
    label: "Locations",
    singular: "Location",
    title: "GTA 6 Locations – Regions and Places in Leonida",
    description:
      "Regions and places of the state of Leonida in Grand Theft Auto VI, with the official source for each one.",
    intro:
      "Regions, towns and landmarks across the fictional state of Leonida. Each place shows where it was confirmed, so you can tell official material apart from in-game discoveries.",
    hasDetailPages: true,
  },
  weapons: {
    key: "weapons",
    launched: false,
    path: "/weapons",
    label: "Weapons",
    singular: "Weapon",
    title: "GTA 6 Weapons – Weapon List and Locations",
    description:
      "Grand Theft Auto VI weapons that can be verified, with categories, where to find them and the evidence behind each entry.",
    intro:
      "Firearms, melee weapons and throwables in Grand Theft Auto VI. Weapons are listed only once they can be identified from official material or verified in-game.",
    hasDetailPages: true,
  },
  cheats: {
    key: "cheats",
    launched: true,
    path: "/cheats",
    label: "Cheat Codes",
    singular: "Cheat code",
    title: "GTA 6 Cheat Codes – Tested Cheats List",
    description:
      "Grand Theft Auto VI cheat codes that have been tested in-game, with the platform and version each one was checked on.",
    intro:
      "Cheat codes for Grand Theft Auto VI. Codes appear here only after being tested in the released game; we never publish unconfirmed or made-up codes.",
    hasDetailPages: false,
  },
  collectibles: {
    key: "collectibles",
    launched: false,
    path: "/collectibles",
    label: "Collectibles",
    singular: "Collectible",
    title: "GTA 6 Collectibles – Locations and Rewards",
    description:
      "Grand Theft Auto VI collectibles, their locations and rewards, added as they are verified in-game.",
    intro:
      "Hidden items, their locations and what you get for finding them. Each collectible is marked as verified or not yet discovered.",
    hasDetailPages: false,
  },
  characters: {
    key: "characters",
    launched: true,
    path: "/characters",
    label: "Characters",
    singular: "Character",
    title: "GTA 6 Characters – Protagonists and Cast",
    description:
      "Characters of Grand Theft Auto VI, starting with those confirmed by Rockstar Games, each with its official source.",
    intro:
      "The protagonists and supporting cast of Grand Theft Auto VI, with the source that confirms each character.",
    hasDetailPages: false,
  },
  guides: {
    key: "guides",
    launched: false,
    path: "/guides",
    label: "Guides",
    singular: "Guide",
    title: "GTA 6 Guides – Tips, Walkthroughs and How-Tos",
    description:
      "Practical Grand Theft Auto VI guides written from verified in-game experience.",
    intro:
      "Step-by-step guides, tips and explainers for Grand Theft Auto VI, written from verified play rather than rumours.",
    hasDetailPages: false,
  },
  news: {
    key: "news",
    launched: false,
    path: "/news",
    label: "News",
    singular: "News article",
    title: "GTA 6 News – Official Announcements and Updates",
    description:
      "Grand Theft Auto VI news based on official announcements, each article linked to its source.",
    intro: "Official Grand Theft Auto VI announcements and updates, always linked to the original source.",
    hasDetailPages: false,
  },
};

/** Sections currently visible on the public website. */
export function launchedCollections(): CollectionConfig[] {
  return COLLECTION_ORDER.map((key) => COLLECTIONS[key]).filter((c) => c.launched);
}

export const COLLECTION_ORDER: CollectionKey[] = [
  "vehicles",
  "missions",
  "locations",
  "weapons",
  "cheats",
  "collectibles",
  "characters",
  "guides",
  "news",
];
