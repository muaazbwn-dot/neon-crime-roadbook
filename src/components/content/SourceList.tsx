import { ExternalLink } from "lucide-react";

import type { Source } from "@/content/types";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <ul className="space-y-2 text-sm">
      {sources.map((source) => (
        <li key={source.url} className="flex flex-col gap-0.5">
          <a
            href={source.url}
            rel="noopener nofollow"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-foreground underline decoration-neon-cyan/40 underline-offset-4 transition-colors hover:decoration-neon-cyan"
          >
            {source.label}
            <ExternalLink aria-hidden="true" className="size-3.5 text-muted-foreground" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <span className="font-mono text-[0.7rem] text-muted-foreground">
            {source.publisher} · checked {formatDate(source.accessedOn)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { formatDate };
