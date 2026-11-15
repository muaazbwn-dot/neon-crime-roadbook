import type { Source } from "../types";

/** Reusable official sources. `accessedOn` is the date an editor last checked the page. */
export const OFFICIAL_SITE: Source = {
  label: "Grand Theft Auto VI – official website",
  url: "https://www.rockstargames.com/VI",
  publisher: "Rockstar Games",
  accessedOn: "2026-11-15",
};

export function officialProfile(path: string, label: string): Source {
  return {
    label: `${label} – official GTA VI website`,
    url: `https://www.rockstargames.com/VI/only-in-leonida/${path}`,
    publisher: "Rockstar Games",
    accessedOn: "2026-11-15",
  };
}
