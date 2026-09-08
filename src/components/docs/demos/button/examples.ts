import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "variants",
    title: "Variants",
    description:
      "Six ways of applying the colour, from a filled solid down to a bare link. Use one variant per level of emphasis on a screen.",
    client: "none",
  },
  {
    id: "colors",
    title: "Colours",
    description:
      "Six semantic intents. Primary is the near black brand colour, and each intent resolves through the theme tokens rather than a fixed Tailwind hue.",
    client: "none",
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Padding, text size and the icon slot move together across five steps.",
    client: "none",
  },
  {
    id: "icons",
    title: "Icons",
    description:
      "Leading and trailing slots wrap the icon in a shrink resistant span that the recipe sizes for you.",
    client: "none",
  },
  {
    id: "loading",
    title: "Loading",
    description:
      "The loading prop swaps the leading slot for a spinner, disables the button and marks it busy for assistive technology.",
    client: "none",
  },
  {
    id: "shapes",
    title: "Block and square",
    description:
      "Block fills the width of its container. Square drops the horizontal padding for an icon only button.",
    client: "none",
  },
] satisfies DemoExample[];
