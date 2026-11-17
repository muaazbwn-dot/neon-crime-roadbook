import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { EntryCard } from "@/components/content/EntryCard";
import { MapExplorer } from "@/components/map/MapExplorer";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionLinks } from "@/components/content/SectionLinks";
import { StatusLegend } from "@/components/content/StatusLegend";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { mapDataQuery } from "@/content/map/queries";
import { collectionQuery } from "@/content/queries";
import { buildHead } from "@/lib/seo";

const crumbs = [{ name: "Map Guide", path: "/map" }];

/**
 * Map Guide: the interactive map (data in src/content/map/) plus the officially
 * confirmed regions, which stay in the server-rendered HTML for search engines.
 */
export const Route = createFileRoute("/map")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(collectionQuery("locations")),
      context.queryClient.ensureQueryData(mapDataQuery()),
    ]);
  },
  head: () =>
    buildHead({
      title: "GTA 6 Map Guide – Regions of Leonida",
      description:
        "A guide to the map of Grand Theft Auto VI: the regions of the state of Leonida confirmed by Rockstar Games, each linked to its official source.",
      path: "/map",
      breadcrumbs: crumbs,
    }),
  component: MapPage,
  errorComponent: RouteError,
  notFoundComponent: () => <NotFoundView />,
});

function MapPage() {
  const { data: regions } = useSuspenseQuery(collectionQuery("locations"));
  const { data: mapData } = useSuspenseQuery(mapDataQuery());
  return (
    <>
      <PageHeader
        eyebrow="State of Leonida"
        title="GTA 6 Map Guide"
        crumbs={crumbs}
        intro={
          <p>
            Grand Theft Auto VI is set in Leonida, a fictional state that includes Vice City.
            Explore the interactive map below, and see the {regions.length} regions Rockstar Games has
            confirmed so far, each with its official source.
          </p>
        }
      >
        <StatusLegend compact />
      </PageHeader>

      <MapExplorer data={mapData} />

      <section aria-labelledby="regions-heading" className="container-site border-t border-border py-10 sm:py-14">
        <h2 id="regions-heading" className="font-heading text-4xl">
          Confirmed regions
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <li key={region.slug}>
              <EntryCard entry={region} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </section>

      <SectionLinks exclude="/map" />
    </>
  );
}
