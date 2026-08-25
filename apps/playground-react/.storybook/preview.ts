import { definePreview } from "@storybook/react-vite";
import addonThemes from "@storybook/addon-themes";
import "../src/index.css";

export default definePreview({
  addons: [addonThemes()],
});
