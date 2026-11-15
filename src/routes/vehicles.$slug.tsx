import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { EntryDetail } from "@/components/content/EntryDetail";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { COLLECTIONS } from "@/content/collections";
import { entryQuery } from "@/content/queries";
import { entryHead } from "@/lib/entry-seo";

const config = COLLECTIONS.vehicles;

export const Route = createFileRoute("/vehicles/$slug")({
  // Record URLs are added to the sitemap individually (see sitemap[.]xml.ts).
  staticData: { sitemap: true },
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(entryQuery("vehicles", params.slug)),
  head: ({ loaderData, params }) => entryHead(config, loaderData?.entry, params.slug),
  component: VehiclePage,
  errorComponent: RouteError,
  notFoundComponent: () => (
    <NotFoundView
      title="Vehicle not found"
      message="We haven't verified this vehicle, or the address is wrong. Browse the vehicle list for everything confirmed so far."
    />
  ),
});

function VehiclePage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(entryQuery("vehicles", slug));
  return <EntryDetail entry={data.entry} related={data.related} />;
}
