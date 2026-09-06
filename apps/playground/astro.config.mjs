// @ts-check
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

/** @param {string} name @param {string} [file] */
const src = (name, file = "index.ts") =>
  fileURLToPath(new URL(`../../packages/${name}/src/${file}`, import.meta.url));

const disableJsxRefresh = () => ({
  name: "playground:disable-jsx-refresh",
  /** @param {{ oxc?: { jsx?: { refresh?: boolean } } }} config */
  configResolved(config) {
    if (config.oxc?.jsx) config.oxc.jsx.refresh = false;
  },
});

export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss(), disableJsxRefresh()],
    resolve: {
      alias: [
        { find: /^@75neo\/react$/, replacement: src("react") },
        {
          find: /^@75neo\/react\/accordion$/,
          replacement: src("react", "accordion/index.ts"),
        },
        {
          find: /^@75neo\/react\/button$/,
          replacement: src("react", "button/index.ts"),
        },
        {
          find: /^@75neo\/react\/clipboard$/,
          replacement: src("react", "clipboard/index.ts"),
        },
        {
          find: /^@75neo\/react\/table-of-contents$/,
          replacement: src("react", "table-of-contents/index.ts"),
        },
        {
          find: /^@75neo\/react\/combobox$/,
          replacement: src("react", "combobox/index.ts"),
        },
        {
          find: /^@75neo\/react\/listbox$/,
          replacement: src("react", "listbox/index.ts"),
        },
        {
          find: /^@75neo\/react\/menu$/,
          replacement: src("react", "menu/index.ts"),
        },
        {
          find: /^@75neo\/react\/select$/,
          replacement: src("react", "select/index.ts"),
        },
        {
          find: /^@75neo\/react\/tree-view$/,
          replacement: src("react", "tree-view/index.ts"),
        },
        {
          find: /^@75neo\/react\/date-picker$/,
          replacement: src("react", "date-picker/index.ts"),
        },
        {
          find: /^@75neo\/react\/date-input$/,
          replacement: src("react", "date-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/color-picker$/,
          replacement: src("react", "color-picker/index.ts"),
        },
        {
          find: /^@75neo\/react\/toggle$/,
          replacement: src("react", "toggle/index.ts"),
        },
        {
          find: /^@75neo\/react\/toggle-group$/,
          replacement: src("react", "toggle-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/tabs$/,
          replacement: src("react", "tabs/index.ts"),
        },
        {
          find: /^@75neo\/react\/download-trigger$/,
          replacement: src("react", "download-trigger/index.ts"),
        },
        {
          find: /^@75neo\/react\/dialog$/,
          replacement: src("react", "dialog/index.ts"),
        },
        {
          find: /^@75neo\/react\/drawer$/,
          replacement: src("react", "drawer/index.ts"),
        },
        {
          find: /^@75neo\/react\/popover$/,
          replacement: src("react", "popover/index.ts"),
        },
        {
          find: /^@75neo\/react\/hover-card$/,
          replacement: src("react", "hover-card/index.ts"),
        },
        {
          find: /^@75neo\/react\/floating-panel$/,
          replacement: src("react", "floating-panel/index.ts"),
        },
        {
          find: /^@75neo\/react\/progress$/,
          replacement: src("react", "progress/index.ts"),
        },
        {
          find: /^@75neo\/react\/steps$/,
          replacement: src("react", "steps/index.ts"),
        },
        {
          find: /^@75neo\/react\/toast$/,
          replacement: src("react", "toast/index.ts"),
        },
        {
          find: /^@75neo\/react\/tour$/,
          replacement: src("react", "tour/index.ts"),
        },
        {
          find: /^@75neo\/react\/checkbox$/,
          replacement: src("react", "checkbox/index.ts"),
        },
        {
          find: /^@75neo\/react\/radio-group$/,
          replacement: src("react", "radio-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/switch$/,
          replacement: src("react", "switch/index.ts"),
        },
        {
          find: /^@75neo\/react\/segment-group$/,
          replacement: src("react", "segment-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/rating-group$/,
          replacement: src("react", "rating-group/index.ts"),
        },
        {
          find: /^@75neo\/react\/number-input$/,
          replacement: src("react", "number-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/password-input$/,
          replacement: src("react", "password-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/pin-input$/,
          replacement: src("react", "pin-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/tags-input$/,
          replacement: src("react", "tags-input/index.ts"),
        },
        {
          find: /^@75neo\/react\/editable$/,
          replacement: src("react", "editable/index.ts"),
        },
        { find: /^@75neo\/themes$/, replacement: src("themes") },
        { find: /^@75neo\/vue$/, replacement: src("vue") },
        {
          find: /^@75neo\/vue\/accordion$/,
          replacement: src("vue", "accordion/index.ts"),
        },
        { find: /^@75neo\/vue\/button$/, replacement: src("vue", "button/index.ts") },
        {
          find: /^@75neo\/vue\/clipboard$/,
          replacement: src("vue", "clipboard/index.ts"),
        },
        {
          find: /^@75neo\/vue\/table-of-contents$/,
          replacement: src("vue", "table-of-contents/index.ts"),
        },
        {
          find: /^@75neo\/vue\/combobox$/,
          replacement: src("vue", "combobox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/listbox$/,
          replacement: src("vue", "listbox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/menu$/,
          replacement: src("vue", "menu/index.ts"),
        },
        {
          find: /^@75neo\/vue\/select$/,
          replacement: src("vue", "select/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tree-view$/,
          replacement: src("vue", "tree-view/index.ts"),
        },
        {
          find: /^@75neo\/vue\/date-picker$/,
          replacement: src("vue", "date-picker/index.ts"),
        },
        {
          find: /^@75neo\/vue\/date-input$/,
          replacement: src("vue", "date-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/color-picker$/,
          replacement: src("vue", "color-picker/index.ts"),
        },
        {
          find: /^@75neo\/vue\/toggle$/,
          replacement: src("vue", "toggle/index.ts"),
        },
        {
          find: /^@75neo\/vue\/toggle-group$/,
          replacement: src("vue", "toggle-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tabs$/,
          replacement: src("vue", "tabs/index.ts"),
        },
        {
          find: /^@75neo\/vue\/download-trigger$/,
          replacement: src("vue", "download-trigger/index.ts"),
        },
        {
          find: /^@75neo\/vue\/dialog$/,
          replacement: src("vue", "dialog/index.ts"),
        },
        {
          find: /^@75neo\/vue\/drawer$/,
          replacement: src("vue", "drawer/index.ts"),
        },
        {
          find: /^@75neo\/vue\/popover$/,
          replacement: src("vue", "popover/index.ts"),
        },
        {
          find: /^@75neo\/vue\/hover-card$/,
          replacement: src("vue", "hover-card/index.ts"),
        },
        {
          find: /^@75neo\/vue\/floating-panel$/,
          replacement: src("vue", "floating-panel/index.ts"),
        },
        {
          find: /^@75neo\/vue\/progress$/,
          replacement: src("vue", "progress/index.ts"),
        },
        {
          find: /^@75neo\/vue\/steps$/,
          replacement: src("vue", "steps/index.ts"),
        },
        {
          find: /^@75neo\/vue\/toast$/,
          replacement: src("vue", "toast/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tour$/,
          replacement: src("vue", "tour/index.ts"),
        },
        {
          find: /^@75neo\/vue\/checkbox$/,
          replacement: src("vue", "checkbox/index.ts"),
        },
        {
          find: /^@75neo\/vue\/radio-group$/,
          replacement: src("vue", "radio-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/switch$/,
          replacement: src("vue", "switch/index.ts"),
        },
        {
          find: /^@75neo\/vue\/segment-group$/,
          replacement: src("vue", "segment-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/rating-group$/,
          replacement: src("vue", "rating-group/index.ts"),
        },
        {
          find: /^@75neo\/vue\/number-input$/,
          replacement: src("vue", "number-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/password-input$/,
          replacement: src("vue", "password-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/pin-input$/,
          replacement: src("vue", "pin-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/tags-input$/,
          replacement: src("vue", "tags-input/index.ts"),
        },
        {
          find: /^@75neo\/vue\/editable$/,
          replacement: src("vue", "editable/index.ts"),
        },
      ],
    },
  },
});
