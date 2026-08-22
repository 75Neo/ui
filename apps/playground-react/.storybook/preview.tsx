import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

/**
 * Colour mode is a toolbar global rather than a decorator: the system keys off a class
 * on the document element, which is one place, not one per story.
 */
const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: "Colour mode",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { colorMode: "light" },
  beforeEach({ globals }) {
    document.documentElement.classList.toggle("dark", globals.colorMode === "dark");
  },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
