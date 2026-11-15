export interface NavItem {
  label: string;
  to: string;
}

/**
 * Public launch sections, in header order. Every `to` must have a route file.
 * Hidden sections (missions, weapons, collectibles, locations, guides, news) are added
 * here only when they launch.
 */
export const PRIMARY_NAV = [
  {
    label: "Map Guide",
    to: "/map",
    blurb: "The regions of Leonida, with the official source for each one.",
  },
  {
    label: "Vehicles",
    to: "/vehicles",
    blurb: "Cars, bikes, boats and aircraft, with verified locations.",
  },
  {
    label: "Cheat Codes",
    to: "/cheats",
    blurb: "Only codes tested in the released game, with platform and version.",
  },
  {
    label: "Characters",
    to: "/characters",
    blurb: "The lead characters and cast confirmed by Rockstar Games.",
  },
] as const;

export const SITE_NAV = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const LEGAL_NAV = [
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Terms of use", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;
