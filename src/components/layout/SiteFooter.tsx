import { Link } from "@tanstack/react-router";

import { LEGAL_NAV, PRIMARY_NAV, SITE_NAV } from "@/config/navigation";
import { LEGAL_DISCLAIMER, SITE } from "@/config/site";

import { Wordmark } from "./Wordmark";

function FooterColumn({ title, items }: { title: string; items: ReadonlyArray<{ label: string; to: string }> }) {
  return (
    <div>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{SITE.tagline}.</p>
        </div>
        <FooterColumn title="Sections" items={PRIMARY_NAV} />
        <FooterColumn title="Site" items={SITE_NAV} />
        <FooterColumn title="Legal" items={LEGAL_NAV} />
      </div>
      <div className="border-t border-border">
        <p className="container-site py-6 text-xs leading-relaxed text-muted-foreground">
          {LEGAL_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
