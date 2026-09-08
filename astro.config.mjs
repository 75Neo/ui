// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

const REFRESH_SHIM = "const $RefreshSig$ = () => (type) => type;\nconst $RefreshReg$ = () => {};\n";

const serverRefreshShim = {
  name: "75neo:server-react-refresh-shim",
  apply: "serve",
  enforce: "post",
  /**
   * @param {string} code
   * @param {string} _id
   * @param {{ ssr?: boolean }} [options]
   */
  transform(code, _id, options) {
    if (!options?.ssr) return null;
    if (!code.includes("$RefreshSig$") && !code.includes("$RefreshReg$")) return null;
    if (code.includes("const $RefreshSig$")) return null;
    return { code: REFRESH_SHIM + code, map: null };
  },
};

export default defineConfig({
  site: "https://75neo-ui.pages.dev",
  integrations: [vue(), react({ include: ["**/*.tsx", "**/*.jsx"] })],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  redirects: { "/docs": "/docs/introduction" },
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss(), serverRefreshShim],
  },
});
