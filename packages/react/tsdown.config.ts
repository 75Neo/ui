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
    "src/combobox/index.ts",
    "src/listbox/index.ts",
    "src/menu/index.ts",
    "src/select/index.ts",
    "src/tree-view/index.ts",
    "src/toggle/index.ts",
    "src/toggle-group/index.ts",
    "src/tabs/index.ts",
    "src/download-trigger/index.ts",
    "src/checkbox/index.ts",
    "src/radio-group/index.ts",
    "src/switch/index.ts",
    "src/segment-group/index.ts",
    "src/rating-group/index.ts",
    "src/number-input/index.ts",
    "src/password-input/index.ts",
    "src/pin-input/index.ts",
    "src/tags-input/index.ts",
    "src/editable/index.ts",
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
