import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/content/LegalPage";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: () =>
    buildHead({
      title: "Terms of Use",
      description: "The terms for using GTA VI Guide, an independent fan-made Grand Theft Auto VI resource.",
      path: "/terms",
      breadcrumbs: [{ name: "Terms of use", path: "/terms" }],
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updatedOn="2026-11-15">
      <p>By using GTA VI Guide you agree to these terms.</p>
      <h2>Use of the site</h2>
      <p>
        The site is free to read for personal, non-commercial use. Please do not copy entries in
        bulk or republish them as your own.
      </p>
      <h2>Accuracy</h2>
      <p>
        We label every entry by how well it is verified, but game details can change with updates.
        Content is provided as is, without guarantees. See the <Link to="/disclaimer">disclaimer</Link>.
      </p>
      <h2>Trademarks</h2>
      <p>
        Grand Theft Auto, GTA and related names belong to Take-Two Interactive Software, Inc. They
        are used here only to identify the game this guide is about.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows the latest version.</p>
    </LegalPage>
  );
}
