import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths } from "@/lib/sitemap";

// Match routes without running loaders or rendering.
const makeRouter = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });
const leafRouteId = (path: string) => makeRouter().matchRoutes(path).at(-1)?.routeId;

describe("Public routes", () => {
  const launched = [
    "/",
    "/map",
    "/vehicles",
    "/vehicles/some-vehicle",
    "/cheats",
    "/characters",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ];

  it.each(launched)("%s resolves to a page", (path) => {
    expect(leafRouteId(path)).not.toBe(rootRouteId);
  });

  const hidden = ["/missions", "/weapons", "/collectibles", "/locations", "/guides", "/news", "/businesses"];

  it.each(hidden)("hidden section %s has no public page", (path) => {
    expect(leafRouteId(path)).toBe(rootRouteId);
  });
});

describe("Sitemap route decisions", () => {
  const paths = sitemapStaticPaths(makeRouter());

  it("includes the home page, Map Guide, Characters and site pages", () => {
    for (const path of ["/", "/map", "/characters", "/about", "/privacy-policy", "/terms", "/disclaimer"]) {
      expect(paths).toContain(path);
    }
  });

  it("leaves out sections with no verified entries yet", () => {
    expect(paths).not.toContain("/vehicles");
    expect(paths).not.toContain("/cheats");
  });

  it("leaves out Contact while no contact address is configured", () => {
    expect(paths).not.toContain("/contact");
  });
});
