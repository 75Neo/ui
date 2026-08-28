// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: { theme: "github-dark", wrap: false },
  },
  integrations: [react(), vue()],
});
