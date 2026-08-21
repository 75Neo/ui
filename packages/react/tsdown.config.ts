import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  // The package is `"type": "module"`, so plain .js keeps the exports map simple.
  fixedExtension: false,
  dts: true,
  clean: true,
  treeshake: true,
});
