/**
 * Site-wide configuration. Values here are the single source of truth for branding,
 * the public origin and contact details.
 */
export const SITE = {
  name: "GTA VI Guide",
  tagline: "The independent Grand Theft Auto VI encyclopedia",
  description:
    "An independent, fan-made Grand Theft Auto VI encyclopedia, map and walkthrough resource. Every entry is labelled by how well it has been verified.",
  /**
   * Public origin, e.g. "https://www.example.com" (no trailing slash).
   * While empty, canonical and og:url stay relative and /sitemap.xml answers 503.
   */
  url: "",
  /** Public contact address. While null, /contact is noindex and shows no address. */
  contactEmail: null as string | null,
  locale: "en_US",
  language: "en",
} as const;

export const LEGAL_DISCLAIMER =
  "GTA VI Guide is an independent fan-made website. It is not affiliated with, endorsed, sponsored or approved by Rockstar Games or Take-Two Interactive. Grand Theft Auto, GTA and related names are trademarks of Take-Two Interactive Software, Inc.";
