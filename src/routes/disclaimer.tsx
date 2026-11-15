import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/content/LegalPage";
import { LEGAL_DISCLAIMER } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  staticData: { sitemap: true },
  head: () =>
    buildHead({
      title: "Disclaimer",
      description:
        "GTA VI Guide is an independent fan-made website, not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.",
      path: "/disclaimer",
      breadcrumbs: [{ name: "Disclaimer", path: "/disclaimer" }],
    }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer" updatedOn="2026-11-15">
      <p>{LEGAL_DISCLAIMER}</p>
      <h2>No official connection</h2>
      <p>
        We do not use Rockstar Games' logos, and nothing on this site should be read as an official
        statement from Rockstar Games.
      </p>
      <h2>Images and media</h2>
      <p>
        Any game imagery is used for identification and commentary, and is credited to its owner.
      </p>
      <h2>Verification labels</h2>
      <p>
        Entries marked "Reported, unverified" or "Speculation" are not confirmed facts. Always check
        the label and the linked source.
      </p>
    </LegalPage>
  );
}
