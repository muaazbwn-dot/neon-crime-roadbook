import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CollectionHub } from "@/components/content/CollectionHub";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { COLLECTIONS } from "@/content/collections";
import { collectionQuery } from "@/content/queries";
import { isCollectionIndexable } from "@/content/repository";
import { hubHead } from "@/lib/entry-seo";

const config = COLLECTIONS.characters;

export const Route = createFileRoute("/characters")({
  staticData: { sitemap: isCollectionIndexable("characters") },
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery("characters")),
  head: () => hubHead(config),
  component: CharactersPage,
  errorComponent: RouteError,
  notFoundComponent: () => <NotFoundView />,
});

function CharactersPage() {
  const { data } = useSuspenseQuery(collectionQuery("characters"));
  return <CollectionHub config={config} entries={data} />;
}
