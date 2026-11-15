import type { ReactNode } from "react";

import type { CollectionConfig } from "@/content/collections";
import type { ContentEntry } from "@/content/types";

import { EmptyCollection } from "./EmptyCollection";
import { EntryCard } from "./EntryCard";
import { PageHeader } from "./PageHeader";
import { SectionLinks } from "./SectionLinks";
import { StatusLegend } from "./StatusLegend";

interface CollectionHubProps {
  config: CollectionConfig;
  entries: ContentEntry[];
  /** Visible H1; defaults to "GTA 6 <label>". */
  heading?: string;
  /** Extra content under the list (e.g. how-to notes). */
  children?: ReactNode;
}

/** Shared layout for every section hub page. */
export function CollectionHub({ config, entries, heading, children }: CollectionHubProps) {
  return (
    <>
      <PageHeader
        eyebrow={`${entries.length} ${entries.length === 1 ? "entry" : "entries"} · every one labelled`}
        title={heading ?? `GTA 6 ${config.label}`}
        intro={<p>{config.intro}</p>}
        crumbs={[{ name: config.label, path: config.path }]}
      >
        <StatusLegend compact />
      </PageHeader>

      <section aria-label={`${config.label} list`} className="container-site py-10 sm:py-14">
        {entries.length === 0 ? (
          <EmptyCollection singular={config.singular} />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <EntryCard entry={entry} />
              </li>
            ))}
          </ul>
        )}
        {children}
      </section>

      <SectionLinks exclude={config.path} />
    </>
  );
}
