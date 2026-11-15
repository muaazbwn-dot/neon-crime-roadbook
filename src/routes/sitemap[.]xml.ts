import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";

import { SITE } from "@/config/site";
import { COLLECTION_ORDER, COLLECTIONS } from "@/content/collections";
import { isEntryIndexable, publishedEntries } from "@/content/repository";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

// Set SITE.url in src/config/site.ts to the public origin before publishing.
const BASE_URL = SITE.url;

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        if (!BASE_URL) {
          return new Response("Sitemap domain not configured", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
          });
        }
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // Record pages for launched sections that have them (currently vehicles).
        for (const key of COLLECTION_ORDER) {
          const config = COLLECTIONS[key];
          if (!config.launched || !config.detailPath) continue;
          const routeId = config.detailPath;
          if (!isSitemapRouteIncluded(router.routesById[routeId])) continue;
          for (const entry of publishedEntries(key).filter(isEntryIndexable)) {
            const location = router.buildLocation({
              to: config.detailPath,
              params: { slug: entry.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path, lastmod: entry.updatedOn });
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

