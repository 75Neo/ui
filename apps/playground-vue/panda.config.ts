import { defineConfig } from "@pandacss/dev";
import { preset } from "@75neo/styles";

export default defineConfig({
  presets: ["@pandacss/preset-base", preset],
  // Resolve `@75neo/styles/css` & friends as Panda's own runtime.
  importMap: "@75neo/styles",
  // The library sources must be scanned too, or its recipes never reach the CSS.
  include: ["./src/**/*.{ts,vue}", "../../packages/vue/src/**/*.{ts,vue}"],
  // Editing the preset (tokens, recipes) should restart extraction here too.
  dependencies: ["../../packages/styles/src/**/*.ts"],
  outdir: "styled-system",
  preflight: true,
});
