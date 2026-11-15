import { CONTENT_STATUSES, STATUS_META } from "@/content/status";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./StatusBadge";

/** Explains the five verification labels. `compact` hides the descriptions. */
export function StatusLegend({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Verification labels">
        {CONTENT_STATUSES.map((status) => (
          <li key={status}>
            <StatusBadge status={status} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {CONTENT_STATUSES.map((status) => (
        <div key={status} className="card-surface p-4">
          <dt>
            <StatusBadge status={status} />
          </dt>
          <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {STATUS_META[status].description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
