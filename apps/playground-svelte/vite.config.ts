import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

const src = (pkg: string) => fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

// There is no app here — Storybook is the only consumer of this config, and its Vite
// builder loads it automatically and merges it with its own.
export default defineConfig({
  plugins: [svelte()],
  // Point at library source, not dist: editing a component hot-reloads here with no build step.
  resolve: {
    alias: {
      "@75neo/svelte": src("svelte"),
    },
  },
});
