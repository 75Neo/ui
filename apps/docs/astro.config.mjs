// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // The docs site is styled with the design system it documents, so the same semantic
  // utilities and colour-mode handling are exercised here as in a consumer's app.
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // Astro's built-in Shiki. The docs are dark-on-dark for code either way, so one
    // theme rather than a light/dark pair.
    shikiConfig: { theme: "github-dark", wrap: false },
  },
});
