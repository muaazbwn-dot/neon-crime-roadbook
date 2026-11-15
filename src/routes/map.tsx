import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";

import { EntryCard } from "@/components/content/EntryCard";
import { PageHeader } from "@/components/content/PageHeader";
import { SectionLinks } from "@/components/content/SectionLinks";
import { StatusLegend } from "@/components/content/StatusLegend";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { collectionQuery } from "@/content/queries";
import { buildHead } from "@/lib/seo";

const crumbs = [{ name: "Map Guide", path: "/map" }];

/**
 * Map Guide. Lists the officially confirmed regions (from the locations collection,
 * which has no public pages of its own yet) until the interactive map is built.
 */
export const Route = createFileRoute("/map")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery("locations")),
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
  return (
    <>
      <PageHeader
        eyebrow="State of Leonida"
        title="GTA 6 Map Guide"
        crumbs={crumbs}
        intro={
          <p>
            Grand Theft Auto VI is set in Leonida, a fictional state that includes Vice City.
            Below are the {regions.length} regions Rockstar Games has confirmed so far, each with its
            official source.
          </p>
        }
      >
        <StatusLegend compact />
      </PageHeader>

      <section aria-labelledby="regions-heading" className="container-site py-10 sm:py-14">
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

        <div className="card-surface mt-10 flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:gap-5">
          <MapPinned aria-hidden="true" className="size-6 shrink-0 text-neon-cyan" />
          <div>
            <h2 className="font-heading text-3xl">Interactive map in development</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A searchable map with vehicle spawns and points of interest will be added once
              locations can be checked in the released game. Markers will carry the same
              verification labels as the rest of the guide.
            </p>
          </div>
        </div>
      </section>

      <SectionLinks exclude="/map" />
    </>
  );
}
