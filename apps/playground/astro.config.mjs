// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/** @param {string} name */
const src = (name) =>
  fileURLToPath(new URL(`../../packages/${name}/src/index.ts`, import.meta.url));

/**
 * `@astrojs/react` switches on Vite's global `oxc.jsx.refresh`, and on Vite 8 that transform
 * ignores the `jsxRefreshInclude` / `jsxRefreshExclude` filters it ships with — every module
 * gets React Fast Refresh, including Vue SFCs. React Refresh reads `useSlots()` and
 * `useComponentTheme()` inside a Vue `setup()` as hooks and signs the component with
 * `$RefreshSig$`, which is undefined during SSR, so every page holding a Vue component dies
 * with `$RefreshSig$ is not defined`. Turning the transform off is the only lever that works;
 * passing `include`/`exclude` to `react()` changes the resolved filters but not the behaviour.
 *
 * Cost: React components full-reload on edit instead of hot-swapping with state preserved.
 * Vue HMR is unaffected. Dev-only — the production build never enables refresh, which is why
 * `astro build` succeeds either way.
 */
const disableJsxRefresh = () => ({
  name: "playground:disable-jsx-refresh",
  /** @param {{ oxc?: { jsx?: { refresh?: boolean } } }} config */
  configResolved(config) {
    if (config.oxc?.jsx) config.oxc.jsx.refresh = false;
  },
});

export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss(), disableJsxRefresh()],
    resolve: {
      // The playground previews package *source*, so editing a component or a theme slot
      // hot-reloads instead of waiting on `tsdown --watch` to rebuild `dist`. Type checking
      // still resolves `@75neo/*` through `dist`, which is what a consumer actually gets.
      //
      // The array form matters: object aliases match by prefix, which would rewrite subpath
      // specifiers such as `@75neo/themes/package.json` into nonsense.
      alias: [
        { find: /^@75neo\/core$/, replacement: src("core") },
        { find: /^@75neo\/react$/, replacement: src("react") },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
      ],
    },
  },
});
