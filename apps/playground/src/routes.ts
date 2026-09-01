export interface PreviewRoute {
  href: string;
  /** Component name, matching the export from `@75neo/react` and `@75neo/vue`. */
  label: string;
  /** One line for the index card — what the component is, not what it does well. */
  summary: string;
  /** Registry key, which is also the recipe name and the theme override key. */
  key: string;
}

export const previews: readonly PreviewRoute[] = [
  {
    href: "/accordion",
    label: "Accordion",
    summary: "Three variants across three sizes, wrapping Ark UI for keyboard and ARIA behaviour.",
    key: "accordion",
  },
  {
    href: "/angle-slider",
    label: "AngleSlider",
    summary:
      "A circular dial for picking a rotation, across three sizes and seven colors, with markers and a live readout.",
    key: "angleSlider",
  },
  {
    href: "/button",
    label: "Button",
    summary:
      "Four variants across seven colors and five sizes, with loading, disabled and icon slots.",
    key: "button",
  },
  {
    href: "/avatar",
    label: "Avatar",
    summary:
      "Six sizes across two shapes with image, fallback, and custom image support for NextImage and NuxtImg.",
    key: "avatar",
  },
  {
    href: "/carousel",
    label: "Carousel",
    summary:
      "A looping, autoplaying slideshow with keyboard, drag and indicator navigation, wrapping Ark UI.",
    key: "carousel",
  },
];
