import { defineConfig } from "tsdown/config";
import Vue from "unplugin-vue/rolldown";

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
    "src/number-input/index.ts",
    "src/password-input/index.ts",
    "src/pin-input/index.ts",
    "src/tags-input/index.ts",
    "src/editable/index.ts",
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
