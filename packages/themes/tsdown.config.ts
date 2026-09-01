import { defineConfig } from "tsdown/config";

export default defineConfig({
  entry: ["./src/index.ts", "./src/tokens/index.css"],
  format: ["esm"],
  platform: "neutral",
  fixedExtension: false,
  dts: true,
  clean: true,
  treeshake: true,
  publint: true,
  exports: {
    customExports(exports) {
      delete exports["./style.css"];
      exports["."] = {
        types: "./dist/index.d.ts",
        style: "./dist/style.css",
        default: "./dist/index.js",
      };
      return exports;
    },
  },
});
