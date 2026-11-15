import { describe, expect, it } from "vitest";

import { COLLECTION_ORDER, COLLECTIONS, launchedCollections } from "@/content/collections";
import {
  allPublishedEntries,
  isCollectionIndexable,
  isEntryIndexable,
  getEntryWithRelated,
} from "@/content/repository";
import { CONTENT_STATUSES, STATUS_META } from "@/content/status";
import type { ContentEntry } from "@/content/types";
import { validateEntry } from "@/content/validation";

const baseEntry: ContentEntry = {
  collection: "vehicles",
  slug: "example-car",
  name: "Example",
  summary: "A summary long enough to pass the minimum length check for records.",
  status: "speculation",
  sources: [],
  publishedOn: "2026-11-15",
  updatedOn: "2026-11-15",
};

describe("Verification statuses", () => {
  it("has exactly the five agreed statuses", () => {
    expect(CONTENT_STATUSES.map((s) => STATUS_META[s].label)).toEqual([
      "Officially confirmed",
      "Verified in-game",
      "Reported, unverified",
      "Speculation",
      "Not yet discovered",
    ]);
  });

  it("rejects an officially confirmed record without a source", () => {
    expect(validateEntry({ ...baseEntry, status: "official" })).not.toEqual([]);
  });

  it("rejects a reported record without a source", () => {
    expect(validateEntry({ ...baseEntry, status: "reported" })).not.toEqual([]);
  });

  it("rejects a verified record without platform and version", () => {
    expect(validateEntry({ ...baseEntry, status: "verified" })).not.toEqual([]);
    expect(validateEntry({ ...baseEntry, status: "verified", verifiedOn: "PS5 v1.00" })).toEqual([]);
  });

  it("every published record passes validation", () => {
    expect(allPublishedEntries().flatMap(validateEntry)).toEqual([]);
  });
});

describe("Launch scope", () => {
  it("launches only Vehicles, Cheat Codes and Characters as content sections", () => {
    expect(launchedCollections().map((c) => c.key)).toEqual(["vehicles", "cheats", "characters"]);
  });

  it("keeps hidden sections configured for later", () => {
    for (const key of ["missions", "weapons", "collectibles", "locations", "guides", "news"] as const) {
      expect(COLLECTION_ORDER).toContain(key);
      expect(COLLECTIONS[key].launched).toBe(false);
      expect(isCollectionIndexable(key)).toBe(false);
    }
  });
});

describe("Indexing rules", () => {
  it("does not index an empty section", () => {
    expect(isCollectionIndexable("vehicles")).toBe(false);
  });

  it("indexes a launched section once it has records", () => {
    expect(isCollectionIndexable("characters")).toBe(true);
  });

  it("does not index a record flagged noindex", () => {
    expect(isEntryIndexable({ ...baseEntry, noindex: true })).toBe(false);
    expect(isEntryIndexable(baseEntry)).toBe(true);
  });

  it("returns nothing for an unknown slug", async () => {
    expect(await getEntryWithRelated("vehicles", "does-not-exist")).toBeNull();
  });
});
