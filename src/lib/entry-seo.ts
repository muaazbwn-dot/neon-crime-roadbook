import { COLLECTIONS, type CollectionConfig } from "@/content/collections";
import { isCollectionIndexable, isEntryIndexable } from "@/content/repository";
import type { ContentEntry } from "@/content/types";

import { buildHead, type Crumb } from "./seo";

export function hubCrumbs(config: CollectionConfig): Crumb[] {
  return [{ name: config.label, path: config.path }];
}

export function entryPath(entry: ContentEntry): string {
  return `${COLLECTIONS[entry.collection].path}/${entry.slug}`;
}

export function entryCrumbs(entry: ContentEntry): Crumb[] {
  return [...hubCrumbs(COLLECTIONS[entry.collection]), { name: entry.name, path: entryPath(entry) }];
}

/** head() for a section hub: noindex until the section lists at least one record. */
export function hubHead(config: CollectionConfig) {
  return buildHead({
    title: config.title,
    description: config.description,
    path: config.path,
    noindex: !isCollectionIndexable(config.key),
    breadcrumbs: hubCrumbs(config),
  });
}

/** head() for a record page; falls back to a generic noindex head when the record is missing. */
export function entryHead(config: CollectionConfig, entry: ContentEntry | undefined, slug: string) {
  if (!entry) {
    return buildHead({
      title: `${config.singular} not found`,
      description: `This ${config.singular.toLowerCase()} is not in the GTA VI Guide.`,
      path: `${config.path}/${slug}`,
      noindex: true,
    });
  }
  return buildHead({
    title: `${entry.name} – GTA 6 ${config.singular}`,
    description: entry.summary,
    path: entryPath(entry),
    ogType: "article",
    noindex: !isEntryIndexable(entry),
    breadcrumbs: entryCrumbs(entry),
  });
}
