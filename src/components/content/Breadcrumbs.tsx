import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { withHome, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail. Pass the same crumbs to buildHead() for the JSON-LD version. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail = withHome(crumbs);
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="transition-colors hover:text-neon-cyan">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3 opacity-50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
