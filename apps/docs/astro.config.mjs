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

/** @param {string} name @param {string} [file] */
const src = (name, file = "index.ts") =>
  fileURLToPath(new URL(`../../packages/${name}/src/${file}`, import.meta.url));

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
        { find: /^@75neo\/react$/, replacement: src("react") },
        {
          find: /^@75neo\/react\/accordion$/,
          replacement: src("react", "accordion/index.ts"),
        },
        {
          find: /^@75neo\/react\/button$/,
          replacement: src("react", "button/index.ts"),
        },
        {
          find: /^@75neo\/react\/clipboard$/,
          replacement: src("react", "clipboard/index.ts"),
        },
        {
          find: /^@75neo\/react\/table-of-contents$/,
          replacement: src("react", "table-of-contents/index.ts"),
        },
        {
          find: /^@75neo\/react\/combobox$/,
          replacement: src("react", "combobox/index.ts"),
        },
        {
          find: /^@75neo\/react\/listbox$/,
          replacement: src("react", "listbox/index.ts"),
        },
        {
          find: /^@75neo\/react\/menu$/,
          replacement: src("react", "menu/index.ts"),
        },
        {
          find: /^@75neo\/react\/select$/,
          replacement: src("react", "select/index.ts"),
        },
        {
          find: /^@75neo\/react\/tree-view$/,
          replacement: src("react", "tree-view/index.ts"),
        },
        {
          find: /^@75neo\/react\/checkbox$/,
          replacement: src("react", "checkbox/index.ts"),
        },
        {
          find: /^@75neo\/react\/radio-group$/,
          replacement: src("react", "radio-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/switch$/,
          replacement: src("react", "switch/index.ts"),
        },
        {
          find: /^@75neo\/react\/segment-group$/,
          replacement: src("react", "segment-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/rating-group$/,
          replacement: src("react", "rating-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/number-input$/,
          replacement: src("react", "number-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/password-input$/,
          replacement: src("react", "password-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/pin-input$/,
          replacement: src("react", "pin-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/tags-input$/,
          replacement: src("react", "tags-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/editable$/,
          replacement: src("react", "editable/index.ts"),
        },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
        {
          find: /^@75neo\/vue\/accordion$/,
          replacement: src("vue", "accordion/index.ts"),
        },
        { find: /^@75neo\/vue\/button$/, replacement: src("vue", "button/index.ts") },
        {
          find: /^@75neo\/vue\/clipboard$/,
          replacement: src("vue", "clipboard/index.ts"),
        },
        {
          find: /^@75neo\/vue\/table-of-contents$/,
          replacement: src("vue", "table-of-contents/index.ts"),
        },
        {
          find: /^@75neo\/vue\/combobox$/,
          replacement: src("vue", "combobox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/listbox$/,
          replacement: src("vue", "listbox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/menu$/,
          replacement: src("vue", "menu/index.ts"),
        },
        {
          find: /^@75neo\/vue\/select$/,
          replacement: src("vue", "select/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tree-view$/,
          replacement: src("vue", "tree-view/index.ts"),
        },
        {
          find: /^@75neo\/vue\/checkbox$/,
          replacement: src("vue", "checkbox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/radio-group$/,
          replacement: src("vue", "radio-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/switch$/,
          replacement: src("vue", "switch/index.ts"),
        },
        {
          find: /^@75neo\/vue\/segment-group$/,
          replacement: src("vue", "segment-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/rating-group$/,
          replacement: src("vue", "rating-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/number-input$/,
          replacement: src("vue", "number-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/password-input$/,
          replacement: src("vue", "password-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/pin-input$/,
          replacement: src("vue", "pin-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tags-input$/,
          replacement: src("vue", "tags-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/editable$/,
          replacement: src("vue", "editable/index.ts"),
        },
      ],
    },
  },
});
