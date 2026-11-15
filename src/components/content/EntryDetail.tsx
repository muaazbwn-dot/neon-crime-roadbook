import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { COLLECTIONS } from "@/content/collections";
import type { ContentEntry } from "@/content/types";
import { entryCrumbs } from "@/lib/entry-seo";

import { EntryCard } from "./EntryCard";
import { PageHeader } from "./PageHeader";
import { SectionLinks } from "./SectionLinks";
import { formatDate, SourceList } from "./SourceList";
import { StatusBadge } from "./StatusBadge";

/** Shared layout for a single record page (vehicle, and future sections). */
export function EntryDetail({ entry, related }: { entry: ContentEntry; related: ContentEntry[] }) {
  const config = COLLECTIONS[entry.collection];
  return (
    <>
      <PageHeader title={entry.name} crumbs={entryCrumbs(entry)} eyebrow={config.singular}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={entry.status} />
          <span className="font-mono text-xs text-muted-foreground">
            Updated <time dateTime={entry.updatedOn}>{formatDate(entry.updatedOn)}</time>
          </span>
        </div>
      </PageHeader>

      <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="prose-guide">
          <p className="text-lg text-foreground">{entry.summary}</p>
          {entry.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {entry.facts && entry.facts.length > 0 && (
            <>
              <h2>Details</h2>
              <dl className="divide-y divide-border rounded-lg border border-border">
                {entry.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                    <dd className="flex items-center gap-3 text-sm text-foreground">
                      {fact.value}
                      <StatusBadge status={fact.status} />
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </article>

        <aside className="space-y-6">
          <section aria-labelledby="sources-heading" className="card-surface p-5">
            <h2 id="sources-heading" className="eyebrow">
              Sources
            </h2>
            <div className="mt-4">
              <SourceList sources={entry.sources} />
            </div>
            {entry.verifiedOn && (
              <p className="mt-4 font-mono text-xs text-muted-foreground">Verified on {entry.verifiedOn}</p>
            )}
          </section>
          <Link
            to={config.path}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> All {config.label.toLowerCase()}
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="container-site pb-4">
          <h2 id="related-heading" className="font-heading text-3xl sm:text-4xl">
            Related {config.label.toLowerCase()}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={`${item.collection}-${item.slug}`}>
                <EntryCard entry={item} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <SectionLinks exclude={config.path} />
    </>
  );
}
