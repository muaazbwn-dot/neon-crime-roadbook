import type { ReactNode } from "react";

import type { Crumb } from "@/lib/seo";

import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Top of every inner page: breadcrumbs, the page's single H1, and an intro. */
export function PageHeader({ eyebrow, title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div className="container-site relative py-10 sm:py-14">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="font-heading mt-3 text-5xl text-balance sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && (
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </div>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div aria-hidden="true" className="hairline-neon opacity-40" />
    </header>
  );
}
