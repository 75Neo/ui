/**
 * A root-relative URL, prefixed with the base the site is served from.
 *
 * @remarks
 * The docs are published to GitHub Pages under the repository's own path, so the site
 * root is `/ui/` rather than `/`. Astro rewrites the URLs it generates itself — page
 * routes, bundled assets — and leaves every path written by hand alone, so a link or an
 * icon spelled `/logo-brand.svg` in the markup would 404 on the deployed site while
 * working locally.
 *
 * Reading `BASE_URL` rather than restating the base keeps the two in step: the value
 * follows `base` in `astro.config.mjs`, and a build with no base leaves the path
 * untouched.
 */
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}
