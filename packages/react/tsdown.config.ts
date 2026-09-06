import pluginBabel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "tsdown/config";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/accordion/index.ts",
    "src/button/index.ts",
    "src/clipboard/index.ts",
    "src/table-of-contents/index.ts",
  ],
  format: ["esm"],
  platform: "neutral",
  fixedExtension: false,
  dts: true,
  clean: true,
  treeshake: true,
  exports: true,
  publint: true,
  plugins: [
    pluginBabel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
