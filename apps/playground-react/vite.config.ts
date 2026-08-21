import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const src = (pkg: string) => fileURLToPath(new URL(`../../packages/${pkg}/src`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Point at library source, not dist: editing a component hot-reloads here with no build step.
  resolve: {
    alias: {
      "@75neo/react": src("react"),
    },
  },
});
