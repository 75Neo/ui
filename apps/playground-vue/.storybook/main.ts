import { defineMain } from "@storybook/vue3-vite/node";
import { mergeVueHelperImports } from "./merge-vue-helper-imports";

export default defineMain({
  // storybook-vue-addon compiles `*.stories.vue` SFCs into CSF. Plain `*.stories.ts` still
  // works for anything the addon cannot express yet, such as `args`.
  stories: ["../src/**/*.stories.@(ts|vue)"],
  addons: ["@storybook/addon-themes", "storybook-vue-addon"],
  framework: "@storybook/vue3-vite",
  viteFinal(config) {
    config.plugins?.push(mergeVueHelperImports());
    return config;
  },
});
