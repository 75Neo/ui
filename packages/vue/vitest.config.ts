import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import Vue from "unplugin-vue/vite";

export default defineConfig({
  plugins: [Vue()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});
