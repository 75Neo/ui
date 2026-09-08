// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://75neo-ui.pages.dev",
  integrations: [vue()],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  redirects: { "/docs": "/docs/introduction" },
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
