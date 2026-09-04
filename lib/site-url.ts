/**
 * The site's canonical origin, resolved once and shared by the metadata,
 * sitemap, robots and JSON-LD.
 *
 * Order matters:
 * 1. NEXT_PUBLIC_SITE_URL — set this when a custom domain is attached. It is
 *    the only value that survives a domain change, so it always wins.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel at build time and
 *    always the project's real production host, so the canonical URL stays
 *    correct no matter what the project ends up being called. Without this,
 *    a hardcoded guess silently ships the wrong canonical URL and sitemap.
 * 3. localhost — development.
 *
 * Note VERCEL_PROJECT_PRODUCTION_URL has no protocol, hence the prefix.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
