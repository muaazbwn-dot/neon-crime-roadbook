import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/content/LegalPage";
import { StatusLegend } from "@/components/content/StatusLegend";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () =>
    buildHead({
      title: "About GTA VI Guide",
      description:
        "Who runs GTA VI Guide, how entries are researched and verified, and how the five verification labels work.",
      path: "/about",
      breadcrumbs: [{ name: "About", path: "/about" }],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <LegalPage
      title="About GTA VI Guide"
      path="/about"
      intro={<p>An independent, fan-made encyclopedia for Grand Theft Auto VI.</p>}
    >
      <p>
        GTA VI Guide is a fan project. It is not affiliated with Rockstar Games or Take-Two
        Interactive. Our aim is simple: be the place you can trust for Grand Theft Auto VI facts.
      </p>
      <h2>How entries are verified</h2>
      <p>
        Before release, we publish only what Rockstar Games has shown or stated in official
        material. After release, editors add discoveries they have checked in the game, noting the
        platform and game version. Every record carries one of five labels:
      </p>
      <StatusLegend />
      <h2>What we never do</h2>
      <ul>
        <li>Invent vehicles, spawn locations, cheats, missions or other game details.</li>
        <li>Present rumours or speculation as fact.</li>
        <li>Publish empty placeholder pages to rank in search.</li>
      </ul>
      <h2>Corrections</h2>
      <p>
        Spotted a mistake? Please tell us through the <Link to="/contact">contact page</Link>. We
        review every correction and update the entry's label and sources.
      </p>
    </LegalPage>
  );
}
