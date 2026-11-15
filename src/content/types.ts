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
  /** Unpublished records are never listed, routed or put in the sitemap. */
  draft?: boolean;
  /**
   * Published but too thin to deserve a search listing yet. The page is reachable
   * and linked internally, but carries noindex and stays out of the sitemap.
   */
  noindex?: boolean;
}
