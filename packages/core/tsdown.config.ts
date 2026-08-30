import { defineConfig } from "tsdown/config";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  platform: "neutral",
  fixedExtension: false,
  dts: true,
  clean: true,
  treeshake: true,
  exports: true,
  publint: true,
});
