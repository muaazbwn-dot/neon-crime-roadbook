import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CollectionHub } from "@/components/content/CollectionHub";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { COLLECTIONS } from "@/content/collections";
import { collectionQuery } from "@/content/queries";
import { isCollectionIndexable } from "@/content/repository";
import { hubHead } from "@/lib/entry-seo";

const config = COLLECTIONS.vehicles;

export const Route = createFileRoute("/vehicles/")({
  staticData: { sitemap: isCollectionIndexable("vehicles") },
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery("vehicles")),
  head: () => hubHead(config),
  component: VehiclesPage,
  errorComponent: RouteError,
  notFoundComponent: () => <NotFoundView />,
});

function VehiclesPage() {
  const { data } = useSuspenseQuery(collectionQuery("vehicles"));
  return <CollectionHub config={config} entries={data} />;
}
