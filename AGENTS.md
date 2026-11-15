<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project architecture (GTA VI Guide)

- Pages read content only through `src/content/repository.ts` (async) and `src/content/queries.ts`; keep those signatures so local data can be swapped for a database without touching routes.
- Section metadata lives in `src/content/collections.ts`; a section is public only when `launched: true` AND it has route files and a `PRIMARY_NAV` entry — unlaunched sections keep config/data but get no routes, so they 404 and stay out of the sitemap.
- Every content record carries one `ContentStatus` and must pass `validateEntry` (`src/content/validation.ts`); tests enforce this so unsourced "official"/"reported" records cannot ship.
- Every page sets head via `buildHead()` (`src/lib/seo.ts`) for self-referencing canonical/og:url, breadcrumbs JSON-LD and noindex; section hubs use `hubHead`/`entryHead` so empty sections and thin records stay noindex.
- Sitemap decisions are `staticData.sitemap` on each route, derived from the same indexability helpers; record URLs are added in `src/routes/sitemap[.]xml.ts`. `SITE.url` must be set before the sitemap serves.
- Canonical URL redirects (trailing/double slashes → 301) happen in `src/server.ts` via `src/lib/canonical-redirect.ts`.
- Dark-only design system in `src/styles.css`; status colours are reserved for the five verification labels.
- No public accounts. A future admin/editor dashboard must live under an authenticated layout and write through server functions; public routes stay read-only.
