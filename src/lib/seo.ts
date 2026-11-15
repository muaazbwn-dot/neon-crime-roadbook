import { SITE } from "@/config/site";

export interface Crumb {
  name: string;
  path: string;
}

export interface PageSeo {
  /** Page title without the site suffix. */
  title: string;
  description: string;
  /** Path of this page, e.g. "/vehicles". Canonical and og:url always self-reference it. */
  path: string;
  /** Set false to use `title` verbatim (home page). */
  appendSiteName?: boolean;
  noindex?: boolean;
  ogType?: "website" | "article";
  /** Trail excluding Home; Home is prepended automatically. */
  breadcrumbs?: Crumb[];
  jsonLd?: Record<string, unknown>[];
}

/** Absolute when the public origin is configured, otherwise a root-relative path. */
export function absoluteUrl(path: string): string {
  return SITE.url ? new URL(path, SITE.url).href : path;
}

export function pageTitle(title: string, appendSiteName = true): string {
  return appendSiteName ? `${title} | ${SITE.name}` : title;
}

export function withHome(crumbs: Crumb[]): Crumb[] {
  return [{ name: "Home", path: "/" }, ...crumbs];
}

export function breadcrumbJsonLd(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: withHome(crumbs).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Builds the head() return value for a route. */
export function buildHead(seo: PageSeo) {
  const title = pageTitle(seo.title, seo.appendSiteName ?? true);
  const url = absoluteUrl(seo.path);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: seo.description },
    { property: "og:title", content: title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.ogType ?? "website" },
    { property: "og:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: seo.description },
  ];
  if (seo.noindex) meta.push({ name: "robots", content: "noindex, follow" });

  const jsonLd = [...(seo.jsonLd ?? [])];
  if (seo.breadcrumbs?.length) jsonLd.push(breadcrumbJsonLd(seo.breadcrumbs));

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}
