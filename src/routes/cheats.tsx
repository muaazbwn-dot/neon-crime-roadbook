import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CollectionHub } from "@/components/content/CollectionHub";
import { NotFoundView, RouteError } from "@/components/layout/RouteBoundaries";
import { COLLECTIONS } from "@/content/collections";
import { collectionQuery } from "@/content/queries";
import { isCollectionIndexable } from "@/content/repository";
import { hubHead } from "@/lib/entry-seo";

const config = COLLECTIONS.cheats;

export const Route = createFileRoute("/cheats")({
  staticData: { sitemap: isCollectionIndexable("cheats") },
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery("cheats")),
  head: () => hubHead(config),
  component: CheatsPage,
  errorComponent: RouteError,
  notFoundComponent: () => <NotFoundView />,
});

function CheatsPage() {
  const { data } = useSuspenseQuery(collectionQuery("cheats"));
  return (
    <CollectionHub config={config} entries={data} heading="GTA 6 Cheat Codes">
      <section aria-labelledby="cheat-standard" className="mt-10 card-surface p-6">
        <h2 id="cheat-standard" className="font-heading text-3xl">
          How each code is checked
        </h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <li>
            <strong className="block text-foreground">Tested in-game</strong>
            Every code is entered in the released game before it is listed.
          </li>
          <li>
            <strong className="block text-foreground">Platform and version</strong>
            We note the console and game update each code was tested on.
          </li>
          <li>
            <strong className="block text-foreground">Exact effect</strong>
            What the code does, plus any side effects such as disabled achievements.
          </li>
        </ul>
      </section>
    </CollectionHub>
  );
}
