/**
 * The five verification states every content record must carry.
 * Order matters: it is the order shown in legends, strongest evidence first.
 */
export const CONTENT_STATUSES = [
  "official",
  "verified",
  "reported",
  "speculation",
  "undiscovered",
] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export interface StatusMeta {
  label: string;
  description: string;
  /** Whether at least one cited source is mandatory for this status. */
  requiresSource: boolean;
}

export const STATUS_META: Record<ContentStatus, StatusMeta> = {
  official: {
    label: "Officially confirmed",
    description:
      "Stated or shown by Rockstar Games in official material: trailers, the official website, press releases or official social channels.",
    requiresSource: true,
  },
  verified: {
    label: "Verified in-game",
    description:
      "Independently checked by our editors in the released game, with the platform and game version recorded.",
    requiresSource: false,
  },
  reported: {
    label: "Reported, unverified",
    description:
      "Reported by a named, credible source but not yet confirmed officially or in-game. Shown with the source so you can judge it.",
    requiresSource: true,
  },
  speculation: {
    label: "Speculation",
    description:
      "Informed theory based on available evidence. Always labelled and never presented as fact.",
    requiresSource: false,
  },
  undiscovered: {
    label: "Not yet discovered",
    description:
      "Known or expected to exist, but details such as location, unlock method or stats have not been found yet.",
    requiresSource: false,
  },
};
