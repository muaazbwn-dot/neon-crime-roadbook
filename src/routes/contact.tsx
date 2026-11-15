import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/content/LegalPage";
import { SITE } from "@/config/site";
import { buildHead } from "@/lib/seo";

const hasEmail = SITE.contactEmail !== null;

export const Route = createFileRoute("/contact")({
  // Indexed only once a real contact address is configured.
  staticData: { sitemap: hasEmail },
  head: () =>
    buildHead({
      title: "Contact GTA VI Guide",
      description: "How to reach GTA VI Guide with corrections, new verified discoveries or other questions.",
      path: "/contact",
      noindex: !hasEmail,
      breadcrumbs: [{ name: "Contact", path: "/contact" }],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <LegalPage title="Contact" path="/contact" intro={<p>Corrections, discoveries and questions.</p>}>
      {SITE.contactEmail ? (
        <p>
          Email us at <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      ) : (
        <p>A contact address will be published here shortly.</p>
      )}
      <h2>Reporting a correction</h2>
      <ul>
        <li>The page address and what you believe is wrong.</li>
        <li>Your evidence: a link to official material, or a screenshot or video from the game.</li>
        <li>For in-game finds, your platform and game version.</li>
      </ul>
      <p>
        GTA VI Guide is a fan project and cannot help with game support, purchases or accounts.
        Please contact Rockstar Games directly for those.
      </p>
    </LegalPage>
  );
}
