import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";

import { getEntryWithRelated, listEntries } from "./repository";
import type { CollectionKey } from "./types";

export const collectionQuery = (collection: CollectionKey) =>
  queryOptions({
    queryKey: ["collection", collection],
    queryFn: () => listEntries(collection),
  });

export const entryQuery = (collection: CollectionKey, slug: string) =>
  queryOptions({
    queryKey: ["entry", collection, slug],
    queryFn: async () => {
      const result = await getEntryWithRelated(collection, slug);
      if (!result) throw notFound();
      return result;
    },
  });
