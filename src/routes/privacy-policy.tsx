import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/content/LegalPage";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  staticData: { sitemap: true },
  head: () =>
    buildHead({
      title: "Privacy Policy",
      description: "How GTA VI Guide handles visitor data: no accounts, no sign-up, and minimal technical logging.",
      path: "/privacy-policy",
      breadcrumbs: [{ name: "Privacy policy", path: "/privacy-policy" }],
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updatedOn="2026-11-15">
      <p>
        GTA VI Guide is a reading website. You can use every page without creating an account, and
        we do not offer public registration.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Technical request data.</strong> Like any website, our hosting provider processes
          standard request information (such as IP address, browser type and the page requested)
          to deliver pages and protect the service.
        </li>
        <li>
          <strong>Messages you send us.</strong> If you contact us, we keep your message and email
          address only to reply and handle your request.
        </li>
      </ul>
      <h2>Cookies</h2>
      <p>
        We do not use cookies for advertising or to build visitor profiles. If that changes — for
        example if we add analytics — this policy will be updated first.
      </p>
      <h2>Links to other websites</h2>
      <p>
        Entries link to their sources, such as Rockstar Games' official website. Those sites have
        their own privacy policies.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access or delete any message you have sent us through the contact page.
      </p>
    </LegalPage>
  );
}
