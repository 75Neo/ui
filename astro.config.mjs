// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://75neo-ui.pages.dev",

  integrations: [react(), vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});
