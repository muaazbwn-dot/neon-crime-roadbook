import { STATUS_META } from "./status";
import type { ContentEntry } from "./types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

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
  for (const source of entry.sources) {
    if (!source.url.startsWith("https://")) problems.push(`${where}: source URLs must be https`);
    if (!ISO_DATE.test(source.accessedOn)) problems.push(`${where}: source accessedOn must be YYYY-MM-DD`);
  }
  if (!ISO_DATE.test(entry.publishedOn) || !ISO_DATE.test(entry.updatedOn)) {
    problems.push(`${where}: dates must be YYYY-MM-DD`);
  }
  for (const fact of entry.facts ?? []) {
    if (!(fact.status in STATUS_META)) problems.push(`${where}: fact "${fact.label}" has an unknown status`);
  }
  return problems;
}
