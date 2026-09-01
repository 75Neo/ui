// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/** @param {string} name */
const src = (name) =>
  fileURLToPath(new URL(`../../packages/${name}/src/index.ts`, import.meta.url));

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
      alias: [
        { find: /^@75neo\/core$/, replacement: src("core") },
        { find: /^@75neo\/react$/, replacement: src("react") },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
      ],
    },
  },
});
