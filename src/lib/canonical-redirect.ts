/**
 * One URL per page: returns the canonical URL to 301 to, or null when the request
 * is already canonical. Strips trailing slashes and collapses repeated slashes.
 * File-like paths (anything with an extension) are left alone.
 */
export function canonicalRedirect(requestUrl: string): string | null {
  const url = new URL(requestUrl);
  const { pathname } = url;
  if (pathname === "/") return null;
  if (/\.[a-z0-9]+$/i.test(pathname)) return null;
  if (pathname.startsWith("/_") || pathname.startsWith("/@")) return null;

  let normalized = pathname.replace(/\/{2,}/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) normalized = normalized.replace(/\/+$/, "");
  if (normalized === "") normalized = "/";

  if (normalized === pathname) return null;
  url.pathname = normalized;
  return url.toString();
}
