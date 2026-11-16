import { describe, expect, it } from "vitest";

import { canonicalRedirect } from "@/lib/canonical-redirect";
import { buildHead } from "@/lib/seo";

describe("Canonical redirects", () => {
  it("removes a trailing slash", () => {
    expect(canonicalRedirect("https://x.test/vehicles/")).toBe("https://x.test/vehicles");
  });

  it("collapses double slashes and keeps the query", () => {
    expect(canonicalRedirect("https://x.test//vehicles//car?a=1")).toBe("https://x.test/vehicles/car?a=1");
  });

  it("leaves canonical URLs and files alone", () => {
    expect(canonicalRedirect("https://x.test/")).toBeNull();
    expect(canonicalRedirect("https://x.test/vehicles")).toBeNull();
    expect(canonicalRedirect("https://x.test/sitemap.xml")).toBeNull();
  });
});

describe("Page head", () => {
  it("self-references canonical and og:url, and appends the site name", () => {
    const head = buildHead({ title: "About", description: "d", path: "/about" });
    expect(head.links).toEqual([{ rel: "canonical", href: "/about" }]);
    expect(head.meta).toContainEqual({ property: "og:url", content: "/about" });
    expect(head.meta).toContainEqual({ title: "About | GTA VI Guide" });
  });

  it("adds noindex only when asked", () => {
    const indexed = buildHead({ title: "A", description: "d", path: "/a" });
    const hidden = buildHead({ title: "A", description: "d", path: "/a", noindex: true });
    expect(indexed.meta.some((m) => m["name"] === "robots")).toBe(false);
    expect(hidden.meta).toContainEqual({ name: "robots", content: "noindex, follow" });
  });
});
