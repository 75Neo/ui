import { defineConfig } from "tsdown/config";
import Vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/accordion/index.ts",
    "src/button/index.ts",
    "src/clipboard/index.ts",
    "src/table-of-contents/index.ts",
  ],
  format: ["esm"],
  plugins: [Vue({ isProduction: true })],
  platform: "neutral",
  dts: { vue: true },
  fixedExtension: false,
  clean: true,
  treeshake: true,
  exports: true,
  publint: true,
});
