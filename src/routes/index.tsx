import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";

import { StatusBadge } from "@/components/content/StatusBadge";
import { StatusLegend } from "@/components/content/StatusLegend";
import { Button } from "@/components/ui/button";
import { PRIMARY_NAV } from "@/config/navigation";
import { LEGAL_DISCLAIMER, SITE } from "@/config/site";
import { OFFICIAL_SITE } from "@/content/data/sources";
import { publishedEntries } from "@/content/repository";
import { buildHead } from "@/lib/seo";

/** Entry counts shown on the four section cards, keyed by section path. */
function sectionCounts(): Record<(typeof PRIMARY_NAV)[number]["to"], string> {
  const count = (n: number, one: string, many: string) => (n === 0 ? "Coming soon" : `${n} ${n === 1 ? one : many}`);
  return {
    "/map": count(publishedEntries("locations").length, "official region", "official regions"),
    "/vehicles": count(publishedEntries("vehicles").length, "vehicle", "vehicles"),
    "/cheats": count(publishedEntries("cheats").length, "tested code", "tested codes"),
    "/characters": count(publishedEntries("characters").length, "official character", "official characters"),
  };
}

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () =>
    buildHead({
      title: "GTA VI Guide – GTA 6 Map, Vehicles, Cheats and Characters",
      appendSiteName: false,
      description:
        "Independent Grand Theft Auto VI guide: the map of Leonida, vehicles, tested cheat codes and characters, with every entry labelled by how well it is verified.",
      path: "/",
      jsonLd: SITE.url
        ? [
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE.name,
              url: SITE.url,
              description: SITE.description,
              inLanguage: SITE.language,
            },
          ]
        : [],
    }),
  component: HomePage,
});

function HomePage() {
  const counts = sectionCounts();
  return (
    <>
      {/* Hero: text-only until the owner supplies a cover image. */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-neon-pink/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-neon-cyan/10 blur-3xl"
        />
        <div className="container-site relative py-16 sm:py-24 lg:py-28">
          <p className="eyebrow">Independent · Fan-made · Source-checked</p>
          <h1 className="font-heading mt-4 text-[clamp(3.5rem,13vw,9rem)]">
            GTA VI <span className="text-neon-pink">Guide</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The map of Leonida, vehicles, cheat codes and characters for Grand Theft Auto VI. Every
            entry is labelled by how well it has been verified, so you always know what is fact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="neon" size="lg">
              <Link to="/map">
                Open the Map Guide <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outlineNeon" size="lg">
              <Link to="/vehicles">Browse vehicles</Link>
            </Button>
          </div>

          <aside
            aria-label="Release information"
            className="card-surface mt-12 flex max-w-xl flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Release date</p>
              <p className="font-heading mt-1 text-3xl">November 19, 2026</p>
              <p className="text-sm text-muted-foreground">PlayStation 5 and Xbox Series X|S</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <StatusBadge status="official" />
              <a
                href={OFFICIAL_SITE.url}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-neon-cyan/40 underline-offset-4 hover:text-foreground"
              >
                Source: {OFFICIAL_SITE.publisher}
                <ExternalLink aria-hidden="true" className="size-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* The four launch sections. */}
      <section aria-labelledby="sections-heading" className="container-site py-14 sm:py-20">
        <p className="eyebrow">Start here</p>
        <h2 id="sections-heading" className="font-heading mt-3 text-4xl sm:text-5xl">
          Four sections, built to be trusted
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {PRIMARY_NAV.map((item, index) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="card-surface card-interactive group relative flex h-full flex-col justify-between gap-10 overflow-hidden p-6 sm:p-8"
              >
                <div>
                  <span className="font-mono text-xs text-neon-cyan">0{index + 1}</span>
                  <h3 className="font-heading mt-3 text-4xl sm:text-5xl">{item.label}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.blurb}
                  </p>
                </div>
                <span className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {counts[item.to]}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 text-foreground transition-transform group-hover:translate-x-1 group-hover:text-neon-pink"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Verification standard. */}
      <section aria-labelledby="standards-heading" className="border-t border-border bg-surface/40">
        <div className="container-site py-14 sm:py-20">
          <p className="eyebrow">Our standard</p>
          <h2 id="standards-heading" className="font-heading mt-3 text-4xl sm:text-5xl">
            Every entry carries a label
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We never invent vehicles, locations, cheats or story details. Each record shows one of
            five labels and links to its source.{" "}
            <Link to="/about" className="text-neon-cyan underline underline-offset-4">
              How we work
            </Link>
          </p>
          <StatusLegend className="mt-8" />
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">{LEGAL_DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
