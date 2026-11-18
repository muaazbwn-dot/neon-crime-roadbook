import type { ContentStatus } from "./status";

export type CollectionKey =
  | "vehicles"
  | "missions"
  | "locations"
  | "weapons"
  | "cheats"
  | "collectibles"
  | "characters"
  | "guides"
  | "news";

export interface Source {
  /** Human-readable title of the source, e.g. "Official GTA VI website". */
  label: string;
  url: string;
  publisher: string;
  /** ISO date the source was checked by an editor. */
  accessedOn: string;
}

/** A single attribute with its own verification state (e.g. top speed, spawn area). */
export interface Fact {
  label: string;
  value: string;
  status: ContentStatus;
}

export interface EntryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}

/* ---------- Section-specific details ---------- */

export type VehicleCategory = "cars" | "motorcycles" | "boats" | "aircraft" | "other";

/** How a vehicle appears at a spawn point. */
export type SpawnType = "driving" | "parked" | "dealership" | "specific";

export type Rarity = "common" | "rare" | "special";

/** One place a vehicle can be found. Never add one without evidence. */
export interface VehicleSpawn {
  /** Unique within the vehicle, lowercase-hyphenated. */
  id: string;
  /** Location or area name, e.g. a district or landmark. */
  area: string;
  /** Step-by-step directions or what the source says about the spot. */
  directions: string;
  spawnType: SpawnType;
  status: ContentStatus;
  sources: Source[];
  /** Platform + game version, required for "verified" spawns. */
  verifiedOn?: string;
  /** Only set once checked in-game (status "verified"). */
  rarity?: Rarity;
  /** Id of the marker in src/content/map/locations.ts once the authentic map is in. */
  mapLocationId?: string;
  screenshot?: EntryImage;
}

export interface VehicleDetails {
  category: VehicleCategory;
  /** Body style in plain words, e.g. "Classic sedan". */
  type: string;
  manufacturer?: string;
  /** How players get it, when officially stated (e.g. an edition bonus). */
  availability?: string;
  spawns: VehicleSpawn[];
}

export type GuideCategory = "cheats" | "weapons" | "gameplay" | "beginner" | "vehicles" | "tips";

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  /** Bullet points; optional internal link per item. */
  items?: Array<{ text: string; link?: EntryRef }>;
  /** Marks information that is not available yet. */
  comingSoon?: boolean;
}

export interface GuideDetails {
  category: GuideCategory;
  sections: GuideSection[];
}

export interface CharacterDetails {
  /** Short role line, e.g. "Lead protagonist". */
  role: string;
  /** Biography paragraphs, written from the official profile. */
  biography: string[];
  /** Known background points, each with its own verification status. */
  background: Fact[];
}

export interface EntryRef {
  collection: CollectionKey;
  slug: string;
}

/**
 * One published record. Section-specific fields go in `facts` until a section
 * needs typed fields of its own (add them as an extension of this interface).
 */
export interface ContentEntry {
  collection: CollectionKey;
  /** Lowercase, hyphenated, unique within the collection. Becomes the URL segment. */
  slug: string;
  name: string;
  /** One or two factual sentences. Used for cards and the meta description. */
  summary: string;
  /** Optional long-form paragraphs. */
  body?: string[];
  status: ContentStatus;
  sources: Source[];
  facts?: Fact[];
  image?: EntryImage;
  related?: EntryRef[];
  /** ISO dates set by editors when the content meaningfully changes. */
  publishedOn: string;
  updatedOn: string;
  /** Platform + game version for "verified" records, e.g. "PS5 v1.02". */
  verifiedOn?: string;
  /** Optional editorial ordering; lower comes first, then alphabetical. */
  sortOrder?: number;
  /** Unpublished records are never listed, routed or put in the sitemap. */
  draft?: boolean;
  /**
   * Published but too thin to deserve a search listing yet. The page is reachable
   * and linked internally, but carries noindex and stays out of the sitemap.
   */
  noindex?: boolean;
  /** Required for vehicles. */
  vehicle?: VehicleDetails;
  /** Required for guides. */
  guide?: GuideDetails;
  /** Required for characters. */
  character?: CharacterDetails;
}
