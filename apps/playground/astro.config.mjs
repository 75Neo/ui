// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/** @param {string} name @param {string} [file] */
const src = (name, file = "index.ts") =>
  fileURLToPath(new URL(`../../packages/${name}/src/${file}`, import.meta.url));

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
        { find: /^@75neo\/react$/, replacement: src("react") },
        {
          find: /^@75neo\/react\/accordion$/,
          replacement: src("react", "accordion/index.ts"),
        },
        {
          find: /^@75neo\/react\/button$/,
          replacement: src("react", "button/index.ts"),
        },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
        {
          find: /^@75neo\/vue\/accordion$/,
          replacement: src("vue", "accordion/index.ts"),
        },
        { find: /^@75neo\/vue\/button$/, replacement: src("vue", "button/index.ts") },
      ],
    },
  },
});
