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
      "Six variants across seven colors and five sizes, with block, square, loading and icon slots.",
    key: "button",
  },
  {
    href: "/avatar",
    label: "Avatar",
    summary:
      "Nine sizes across two shapes and seven colors, with image, fallback, and a slot for NextImage or NuxtImg.",
    key: "avatar",
  },
  {
    href: "/checkbox",
    label: "Checkbox",
    summary:
      "A box, a label and an optional description, across five sizes and seven colors, with a real indeterminate state.",
    key: "checkbox",
  },
  {
    href: "/clipboard",
    label: "Clipboard",
    summary:
      "A read-only field holding a value and a button that copies it, across three sizes and seven colors.",
    key: "clipboard",
  },
  {
    href: "/color-picker",
    label: "ColorPicker",
    summary:
      "An inline color picker across three sizes and seven accents, with an alpha channel, an eyedropper and preset swatches.",
    key: "colorPicker",
  },
  {
    href: "/combobox",
    label: "Combobox",
    summary:
      "A field that filters a list as it is typed into, across three sizes and seven accents, single or multiple.",
    key: "combobox",
  },
  {
    href: "/date-input",
    label: "DateInput",
    summary:
      "A date typed a segment at a time, with no format to explain, across three sizes and seven accents.",
    key: "dateInput",
  },
  {
    href: "/dialog",
    label: "Dialog",
    summary:
      "A panel over the page in four sizes, with the overlay, the motion and every way out under the caller's control.",
    key: "dialog",
  },
  {
    href: "/date-picker",
    label: "DatePicker",
    summary:
      "A field with a calendar behind it, taking one date, several, or a range, across three sizes and seven accents.",
    key: "datePicker",
  },
  {
    href: "/collapsible",
    label: "Collapsible",
    summary:
      "One trigger and the panel it opens, across three variants and three sizes, with a collapsed height that turns it into a show-more.",
    key: "collapsible",
  },
  {
    href: "/table-of-contents",
    label: "TableOfContents",
    summary:
      "A rail of heading links that follows the reading position, with an indicator that slides to the section on screen.",
    key: "tableOfContents",
  },
  {
    href: "/carousel",
    label: "Carousel",
    summary:
      "A looping, autoplaying slideshow with keyboard, drag and indicator navigation, wrapping Ark UI.",
    key: "carousel",
  },
];
