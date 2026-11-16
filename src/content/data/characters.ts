import type { ContentEntry } from "../types";
import { officialProfile } from "./sources";

/** Characters profiled on the official GTA VI website (checked 2026-11-15). */
function person(
  slug: string,
  name: string,
  officialPath: string,
  summary?: string,
  sortOrder?: number,
): ContentEntry {
  return {
    collection: "characters",
    slug,
    name,
    summary:
      summary ??
      `${name} is one of the characters profiled by Rockstar Games on the official Grand Theft Auto VI website.`,
    status: "official",
    sources: [officialProfile(officialPath, name)],
    publishedOn: "2026-11-15",
    updatedOn: "2026-11-15",
    ...(sortOrder !== undefined ? { sortOrder } : {}),
  };
}

export const characters: ContentEntry[] = [
  person(
    "jason-duval",
    "Jason Duval",
    "jason",
    "One of the two lead characters. His official profile says he grew up around grifters and crooks, served in the Army, and ended up in the Keys working for local drug runners.",
    1,
  ),
  person(
    "lucia-caminos",
    "Lucia Caminos",
    "lucia",
    "One of the two lead characters, shown alongside Jason Duval in Rockstar Games' official trailers and on the official website.",
    2,
  ),
  person("cal-hampton", "Cal Hampton", "cal"),
  person("boobie-ike", "Boobie Ike", "boobie"),
  person("drequan-priest", "Dre'Quan Priest", "drequan"),
  person("real-dimez", "Real Dimez", "dimez"),
  person("raul-bautista", "Raul Bautista", "raul"),
  person("brian-heder", "Brian Heder", "brian"),
];
