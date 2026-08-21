import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const src = (pkg: string) => fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

export default defineConfig({
  plugins: [vue()],
  server: { port: 5174 },
  // Point at library source, not dist: editing a component hot-reloads here with no build step.
  resolve: {
    alias: {
      "@75neo/vue": src("vue"),
    },
  },
});
