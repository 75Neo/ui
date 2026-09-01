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
    href: "/button",
    label: "Button",
    summary:
      "Four variants across seven colors and five sizes, with loading, disabled and icon slots.",
    key: "button",
  },
];
