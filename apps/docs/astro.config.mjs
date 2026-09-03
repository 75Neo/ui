// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/**
 * The repository root, handed to the build as a literal.
 *
 * @remarks
 * `component-api.ts` reads the library's own sources with ts-morph, and it needs a path
 * to do it. It cannot work one out from its own `import.meta.url`, because by the time
 * it runs it has been bundled into a chunk somewhere under `dist`. This file is never
 * bundled, so its location is the one that stays true.
 */
const repoRoot = fileURLToPath(new URL("../../", import.meta.url));

/** The path the site answers on, which for a GitHub Pages project site is the repo. */
const base = "/ui";

/** @param {string} name */
const src = (name) =>
  fileURLToPath(new URL(`../../packages/${name}/src/index.ts`, import.meta.url));

/**
 * Turn off React Fast Refresh's transform in dev.
 *
 * @remarks
 * It goes with the aliasing below. Once `@75neo/vue` resolves to source, Vue single
 * file components are compiled here rather than arriving pre-built, and the refresh
 * transform reaches them too — it injects `$RefreshSig$` into a module the React
 * runtime never loads, so the first Vue island on the page dies with
 * `$RefreshSig$ is not defined`. The playground carries the same plugin for the same
 * reason.
 */
const disableJsxRefresh = () => ({
  name: "docs:disable-jsx-refresh",
  /** @param {{ oxc?: { jsx?: { refresh?: boolean } } }} config */
  configResolved(config) {
    if (config.oxc?.jsx) config.oxc.jsx.refresh = false;
  },
});

export default defineConfig({
  /*
   * GitHub Pages serves a project site from the repository's own path, so the site root
   * is `/ui/` and not `/` — in `astro dev` too, which keeps the two honest. Astro
   * prefixes the routes and the assets it generates itself; `withBase` in
   * `src/lib/href.ts` covers the handful of URLs written by hand.
   */
  site: "https://75neo.github.io",
  base,
  /*
   * `/docs` belongs to no framework, so it hands the reader to one. React first because
   * it is the larger audience, not because it is the better supported: the switcher in
   * the header is one click away and lands on the same page.
   *
   * The destination spells the base out. Astro prefixes the route it matches on but
   * hands the destination through as written, so this is one of the URLs the base has
   * to be added to by hand.
   */
  redirects: { "/docs": `${base}/docs/react/getting-started` },
  markdown: {
    shikiConfig: { theme: "github-dark", wrap: false },
  },
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss(), disableJsxRefresh()],
    define: { __REPO_ROOT__: JSON.stringify(repoRoot) },
    /*
     * The same aliasing the playground uses. The docs render live specimens and read
     * the API off the same files, so resolving through `dist` meant a prop rename
     * showed up in the tables from source and in the specimens from a stale build.
     * Pointing both at each package's own `src` keeps one answer, and hot-reloads it.
     */
    resolve: {
      alias: [
        { find: /^@75neo\/core$/, replacement: src("core") },
        { find: /^@75neo\/react$/, replacement: src("react") },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
      ],
    },
  },
});
