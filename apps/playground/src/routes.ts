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
    href: "/tree-view",
    label: "TreeView",
    summary: "Nested rows that expand, collapse and select.",
    key: "treeView",
  },
  {
    href: "/checkbox",
    label: "Checkbox",
    summary: "A box that ticks, unticks, or holds the third state.",
    key: "checkbox",
  },
  {
    href: "/radio-group",
    label: "RadioGroup",
    summary: "One choice out of several, each with room for a second line.",
    key: "radioGroup",
  },
  {
    href: "/switch",
    label: "Switch",
    summary: "An on-off control with icons riding the thumb.",
    key: "switch",
  },
  {
    href: "/segment-group",
    label: "SegmentGroup",
    summary: "A row of choices under a sliding pill.",
    key: "segmentGroup",
  },
  {
    href: "/rating-group",
    label: "RatingGroup",
    summary: "Stars that fill whole or half.",
    key: "ratingGroup",
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
  {
    href: "/clipboard",
    label: "Clipboard",
    summary: "A read-only field holding a value and a button that copies it.",
    key: "clipboard",
  },
  {
    href: "/table-of-contents",
    label: "TableOfContents",
    summary: "A rail of heading links that follows the reading position.",
    key: "tableOfContents",
  },
  {
    href: "/combobox",
    label: "Combobox",
    summary: "A field that filters a list as it is typed into, single or multiple.",
    key: "combobox",
  },
  {
    href: "/listbox",
    label: "Listbox",
    summary: "An inline list of options, collecting one or several.",
    key: "listbox",
  },
  {
    href: "/menu",
    label: "Menu",
    summary: "A panel of rows dropped from a trigger, with submenus and ticks.",
    key: "menu",
  },
  {
    href: "/select",
    label: "Select",
    summary: "A button showing the current answer, and the list it opens.",
    key: "select",
  },
  {
    href: "/tree-view",
    label: "TreeView",
    summary: "Nested rows that expand, collapse and select.",
    key: "treeView",
  },
  {
    href: "/number-input",
    label: "NumberInput",
    summary: "A quantity picker or a spinner, stepping with buttons, wheel or keys.",
    key: "numberInput",
  },
  {
    href: "/password-input",
    label: "PasswordInput",
    summary: "A secret field with a visibility toggle.",
    key: "passwordInput",
  },
  {
    href: "/pin-input",
    label: "PinInput",
    summary: "One box per character for codes and OTPs.",
    key: "pinInput",
  },
  {
    href: "/tags-input",
    label: "TagsInput",
    summary: "A field that grows chips as text is entered.",
    key: "tagsInput",
  },
  {
    href: "/editable",
    label: "Editable",
    summary: "Text that turns into a field where it stands.",
    key: "editable",
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
