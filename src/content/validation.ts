import { STATUS_META } from "./status";
import type { ContentEntry, Source } from "./types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function sourceProblems(where: string, sources: Source[]): string[] {
  const problems: string[] = [];
  for (const source of sources) {
    if (!source.url.startsWith("https://")) problems.push(`${where}: source URLs must be https`);
    if (!ISO_DATE.test(source.accessedOn)) problems.push(`${where}: source accessedOn must be YYYY-MM-DD`);
  }
  return problems;
}

/** Returns human-readable problems; an empty array means the record may be published. */
export function validateEntry(entry: ContentEntry): string[] {
  const problems: string[] = [];
  const where = `${entry.collection}/${entry.slug}`;

  if (!SLUG_PATTERN.test(entry.slug)) problems.push(`${where}: slug must be lowercase-hyphenated`);
  if (!entry.name.trim()) problems.push(`${where}: name is required`);
  if (entry.summary.trim().length < 40) problems.push(`${where}: summary is too short`);
  if (STATUS_META[entry.status].requiresSource && entry.sources.length === 0) {
    problems.push(`${where}: "${entry.status}" records must cite at least one source`);
  }
  if (entry.status === "verified" && !entry.verifiedOn) {
    problems.push(`${where}: verified records must record the platform and game version`);
  }
  problems.push(...sourceProblems(where, entry.sources));
  if (!ISO_DATE.test(entry.publishedOn) || !ISO_DATE.test(entry.updatedOn)) {
    problems.push(`${where}: dates must be YYYY-MM-DD`);
  }
  for (const fact of entry.facts ?? []) {
    if (!(fact.status in STATUS_META)) problems.push(`${where}: fact "${fact.label}" has an unknown status`);
  }

  if (entry.collection === "vehicles") {
    if (!entry.vehicle) problems.push(`${where}: vehicles need vehicle details (category, type, spawns)`);
    const seen = new Set<string>();
    for (const spawn of entry.vehicle?.spawns ?? []) {
      const at = `${where} spawn ${spawn.id}`;
      if (!SLUG_PATTERN.test(spawn.id)) problems.push(`${at}: id must be lowercase-hyphenated`);
      if (seen.has(spawn.id)) problems.push(`${at}: duplicate id`);
      seen.add(spawn.id);
      if (STATUS_META[spawn.status].requiresSource && spawn.sources.length === 0) {
        problems.push(`${at}: "${spawn.status}" spawns must cite at least one source`);
      }
      if (spawn.status === "verified" && !spawn.verifiedOn) {
        problems.push(`${at}: verified spawns must record the platform and game version`);
      }
      if (spawn.rarity && spawn.status !== "verified") {
        problems.push(`${at}: rarity can only be set on spawns verified in-game`);
      }
      problems.push(...sourceProblems(at, spawn.sources));
    }
  }
  if (entry.collection === "guides" && (!entry.guide || entry.guide.sections.length === 0)) {
    problems.push(`${where}: guides need a category and at least one section`);
  }
  if (entry.collection === "characters") {
    if (!entry.character) problems.push(`${where}: characters need a role and biography`);
    else if (entry.character.biography.length === 0) problems.push(`${where}: biography is empty`);
  }
  return problems;
}
