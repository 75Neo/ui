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
  {
    href: "/toggle",
    label: "Toggle",
    summary: "A button that stays pressed, in five weights and seven colors.",
    key: "toggle",
  },
  {
    href: "/toggle-group",
    label: "ToggleGroup",
    summary: "A row of toggles sharing one pressed state.",
    key: "toggleGroup",
  },
  {
    href: "/tabs",
    label: "Tabs",
    summary: "Triggers and panels, as pills or as links.",
    key: "tabs",
  },
  {
    href: "/download-trigger",
    label: "DownloadTrigger",
    summary: "A button that saves a blob to disk.",
    key: "downloadTrigger",
  },
  {
    href: "/date-picker",
    label: "DatePicker",
    summary: "A field with a calendar behind it, taking one date or a range.",
    key: "datePicker",
  },
  {
    href: "/date-input",
    label: "DateInput",
    summary: "A date typed a segment at a time, with no format to explain.",
    key: "dateInput",
  },
  {
    href: "/color-picker",
    label: "ColorPicker",
    summary: "An inline color picker with alpha, eyedropper and swatches.",
    key: "colorPicker",
  },
  {
    href: "/dialog",
    label: "Dialog",
    summary: "A centered panel over a backdrop, with a title and a cross.",
    key: "dialog",
  },
  {
    href: "/drawer",
    label: "Drawer",
    summary: "A panel sliding in from an edge, with a title and a cross.",
    key: "drawer",
  },
  {
    href: "/popover",
    label: "Popover",
    summary: "A small panel anchored to a trigger, with a title and a cross.",
    key: "popover",
  },
  {
    href: "/hover-card",
    label: "HoverCard",
    summary: "A small panel appearing beside whatever it describes.",
    key: "hoverCard",
  },
  {
    href: "/floating-panel",
    label: "FloatingPanel",
    summary: "A draggable window with stage controls and resize handles.",
    key: "floatingPanel",
  },
  {
    href: "/progress",
    label: "Progress",
    summary: "A bar or a ring filling toward a value, or sweeping without one.",
    key: "progress",
  },
  {
    href: "/steps",
    label: "Steps",
    summary: "A row of stations walked in order, each with its own panel.",
    key: "steps",
  },
  {
    href: "/toast",
    label: "Toast",
    summary: "A stack of notices held by a store, each with its own copy.",
    key: "toast",
  },
  {
    href: "/tour",
    label: "Tour",
    summary: "A guided walk over the page, one anchored card at a time.",
    key: "tour",
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
