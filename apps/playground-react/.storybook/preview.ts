import { definePreview } from "@storybook/react-vite";
import addonThemes, { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

export default definePreview({
  addons: [addonThemes()],
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
});
