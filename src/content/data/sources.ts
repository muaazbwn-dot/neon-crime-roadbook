import type { Source } from "../types";

/** Reusable official sources. `accessedOn` is the date an editor last checked the page. */
export const OFFICIAL_SITE: Source = {
  label: "Grand Theft Auto VI – official website",
  url: "https://www.rockstargames.com/VI",
  publisher: "Rockstar Games",
  accessedOn: "2026-11-18",
};

/** Edition comparison: names and describes the Ultimate Edition and pre-order vehicles. */
export const OFFICIAL_EDITIONS: Source = {
  label: "Grand Theft Auto VI – editions and pre-order bonuses",
  url: "https://www.rockstargames.com/VI/editions",
  publisher: "Rockstar Games",
  accessedOn: "2026-11-18",
};

export const NEWSWIRE_PRE_ORDER: Source = {
  label: "Pre-Order Grand Theft Auto VI on June 25 – Rockstar Newswire",
  url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
  publisher: "Rockstar Games",
  accessedOn: "2026-11-18",
};

export const NEWSWIRE_PRE_LOAD: Source = {
  label: "Grand Theft Auto VI Pre-Load Begins on November 10 – Rockstar Newswire",
  url: "https://www.rockstargames.com/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10",
  publisher: "Rockstar Games",
  accessedOn: "2026-11-18",
};

export const TAKE_TWO_PRE_ORDER: Source = {
  label: "Rockstar Games Announces Pre-Orders for Grand Theft Auto VI – press release",
  url: "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/",
  publisher: "Take-Two Interactive",
  accessedOn: "2026-11-18",
};

export function officialProfile(path: string, label: string): Source {
  return {
    label: `${label} – official GTA VI website`,
    url: `https://www.rockstargames.com/VI/only-in-leonida/${path}`,
    publisher: "Rockstar Games",
    accessedOn: "2026-11-18",
  };
}
