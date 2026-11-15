export interface NavItem {
  label: string;
  to: string;
}

/** Primary sections, in header order. Every `to` must have a route file. */
export const PRIMARY_NAV = [
  { label: "Map", to: "/map" },
  { label: "Vehicles", to: "/vehicles" },
  { label: "Missions", to: "/missions" },
  { label: "Locations", to: "/locations" },
  { label: "Weapons", to: "/weapons" },
  { label: "Cheats", to: "/cheats" },
  { label: "Collectibles", to: "/collectibles" },
  { label: "Characters", to: "/characters" },
  { label: "Guides", to: "/guides" },
  { label: "News", to: "/news" },
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
