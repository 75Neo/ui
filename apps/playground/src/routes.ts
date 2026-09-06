export interface PreviewRoute {
  href: string;
  /** Component name, matching the export from `@75neo/react` and `@75neo/vue`. */
  label: string;
  /** One line for the index card — what the component is, not what it does well. */
  summary: string;
  /** Data-module key in `@75neo/themes`. */
  key: string;
}

/** The pages that are not one component. They file under `overview` in the palette. */
export const overview: readonly PreviewRoute[] = [
  {
    href: "/",
    label: "Every component",
    summary: "The whole library on one page, each card linking to its own specimens.",
    key: "overview",
  },
  {
    href: "/tokens",
    label: "Tokens",
    summary: "Every color, strength and surface a recipe is allowed to compose.",
    key: "overview",
  },
];

// The vertical slice: Button and Accordion only. The batch migration restores one
// group at a time; adding a route is appending to this array.
const routes: readonly PreviewRoute[] = [
  {
    href: "/accordion",
    label: "Accordion",
    summary: "Composed anatomy parts around Ark UI for keyboard and ARIA behaviour.",
    key: "accordion",
  },
  {
    href: "/button",
    label: "Button",
    summary:
      "Six variants across seven colors and five sizes, with block, square, loading and icon slots.",
    key: "button",
  },
];

/**
 * Every component page, in alphabetical order. Sorted here rather than by hand, so
 * adding a route is appending to the array above. The sidebar, the search dialog and
 * the index all read this one list.
 */
export const previews: readonly PreviewRoute[] = [...routes].sort((a, b) =>
  a.label.localeCompare(b.label),
);
