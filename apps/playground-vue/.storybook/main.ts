import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/vue3-vite",
};

export default config;
