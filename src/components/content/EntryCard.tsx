import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { COLLECTIONS } from "@/content/collections";
import type { ContentEntry } from "@/content/types";

import { SourceList } from "./SourceList";
import { StatusBadge } from "./StatusBadge";

/**
 * Card for one record. Links to the record page when the section has one;
 * otherwise shows the sources inline so the card stands on its own.
 */
export function EntryCard({ entry, headingLevel = "h2" }: { entry: ContentEntry; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const detailPath = COLLECTIONS[entry.collection].detailPath;

  if (detailPath) {
    return (
      <article className="card-surface card-interactive group relative flex h-full flex-col p-5">
        <StatusBadge status={entry.status} className="self-start" />
        <Heading className="font-heading mt-4 text-3xl">
          <Link
            to={detailPath}
            params={{ slug: entry.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {entry.name}
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-4 top-4 size-4 text-muted-foreground transition-colors group-hover:text-neon-cyan"
        />
      </article>
    );
  }

  return (
    <article id={entry.slug} className="card-surface flex h-full flex-col p-5">
      <StatusBadge status={entry.status} className="self-start" />
      <Heading className="font-heading mt-4 text-3xl">{entry.name}</Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
      <div className="mt-5 border-t border-border pt-4">
        <SourceList sources={entry.sources} />
      </div>
    </article>
  );
}
