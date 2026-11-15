import type { ReactNode } from "react";

import { formatDate } from "./SourceList";
import { PageHeader } from "./PageHeader";

/** Layout for About, Contact and legal pages. */
export function LegalPage({
  title,
  path,
  intro,
  updatedOn,
  children,
}: {
  title: string;
  path: string;
  intro?: ReactNode;
  updatedOn?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} intro={intro} crumbs={[{ name: title, path }]}>
        {updatedOn && (
          <p className="font-mono text-xs text-muted-foreground">
            Last updated <time dateTime={updatedOn}>{formatDate(updatedOn)}</time>
          </p>
        )}
      </PageHeader>
      <div className="container-site py-10 sm:py-14">
        <div className="prose-guide">{children}</div>
      </div>
    </>
  );
}
