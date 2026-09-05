// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/**
 * The repository root, handed to the build as a literal. `component-api.ts` reads the
 * library's sources with ts-morph and cannot find them from its own `import.meta.url`,
 * because it runs bundled into a chunk under `dist`. This file is never bundled.
 */
const repoRoot = fileURLToPath(new URL("../../", import.meta.url));

/** @param {string} name */
const src = (name) =>
  fileURLToPath(new URL(`../../packages/${name}/src/index.ts`, import.meta.url));

/**
 * Turn off React Fast Refresh's transform in dev. It goes with the aliasing below: once
 * `@75neo/vue` resolves to source its components are compiled here, and the transform
 * injects `$RefreshSig$` into a module the React runtime never loads.
 */
const disableJsxRefresh = () => ({
  name: "docs:disable-jsx-refresh",
  /** @param {{ oxc?: { jsx?: { refresh?: boolean } } }} config */
  configResolved(config) {
    if (config.oxc?.jsx) config.oxc.jsx.refresh = false;
  },
});

export default defineConfig({
  // Cloudflare serves the project at the root of its hostname, so there is no base path.
  site: "https://75neo-ui.pages.dev",
  // `/docs` belongs to no framework. React first for the larger audience, not for support.
  redirects: { "/docs": "/docs/react/getting-started" },
  markdown: {
    /*
     * One theme per mode. Shiki writes the light colors inline and the dark ones beside
     * them as `--shiki-dark-*`, which `main.css` spends under the root `dark` class.
     */
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss(), disableJsxRefresh()],
    define: { __REPO_ROOT__: JSON.stringify(repoRoot) },
    /*
     * The same aliasing the playground uses. Resolving through `dist` meant a renamed
     * prop reached the tables from source and the specimens from a stale build.
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
