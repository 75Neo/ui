import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const src = (pkg: string) => fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

// There is no app here — Storybook is the only consumer of this config, and its Vite
// builder loads it automatically and merges it with its own.
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // Point at library source, not dist: editing a component hot-reloads here with no build step.
  resolve: {
    alias: {
      "@75neo/vue": src("vue"),
    },
  },
});
