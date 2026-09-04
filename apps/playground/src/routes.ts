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
    href: "/app",
    label: "App",
    summary:
      "The provider an application is wrapped in: a theme, a locale, and the reading direction every rtl: utility depends on.",
    key: "app",
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
    href: "/container",
    label: "Container",
    summary:
      "The measure a page's content is held to, and the gutter that keeps it off the edge. One slot, no variants.",
    key: "container",
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
    href: "/error",
    label: "Error",
    summary:
      "The page shown when there is nothing else to show, across seven colours, centred in what the Header leaves.",
    key: "error",
  },
  {
    href: "/file-upload",
    label: "FileUpload",
    summary:
      "The area files are dropped on and the list of what landed, across three sizes and seven accents, with thumbnails.",
    key: "fileUpload",
  },
  {
    href: "/footer",
    label: "Footer",
    summary:
      "Three regions in a row plus two full-bleed bands, reordered so a phone stacks the links above the copyright.",
    key: "footer",
  },
  {
    href: "/header",
    label: "Header",
    summary:
      "The bar across the top of a page, and the fullscreen menu it opens where there is no room for a navigation.",
    key: "header",
  },
  {
    href: "/main",
    label: "Main",
    summary:
      "The content region that claims the viewport less the Header, so a short page still puts its Footer at the bottom.",
    key: "main",
  },
  {
    href: "/menu",
    label: "Menu",
    summary:
      "The panel a trigger drops, from one flat array of rows: headings, separators, ticks, links and submenus to any depth.",
    key: "menu",
  },
  {
    href: "/number-input",
    label: "NumberInput",
    summary:
      "A field holding one number and the two buttons that step it, in a row or a column, across three sizes and seven accents.",
    key: "numberInput",
  },
  {
    href: "/pagination",
    label: "Pagination",
    summary:
      "The row of page numbers and the arrows either side, across three sizes and seven accents, as buttons or as links.",
    key: "pagination",
  },
  {
    href: "/pin-input",
    label: "PinInput",
    summary:
      "A row of one-character boxes holding a short code, across three sizes and seven accents, in digits or letters.",
    key: "pinInput",
  },
  {
    href: "/rating-group",
    label: "RatingGroup",
    summary:
      "A row of stars across three sizes and seven accents, with half stars cut from the same shape rather than a second icon.",
    key: "ratingGroup",
  },
  {
    href: "/select",
    label: "Select",
    summary:
      "A button holding the current answer and the list it opens, across three sizes and seven accents, single or multiple.",
    key: "select",
  },
  {
    href: "/sidebar",
    label: "Sidebar",
    summary:
      "A collapsing column beside the page across three looks and three collapse modes, sliding in over the page on a phone.",
    key: "sidebar",
  },
  {
    href: "/tags-input",
    label: "TagsInput",
    summary:
      "A field whose answers stay in it as chips, across three sizes and seven accents, with a limit and a rule about what counts.",
    key: "tagsInput",
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
  {
    href: "/switch",
    label: "Switch",
    summary:
      "A track the thumb slides along, across five sizes and seven colors, with a label, a description and an icon per state.",
    key: "switch",
  },
  {
    href: "/tooltip",
    label: "Tooltip",
    summary:
      "A bubble that appears beside whatever it explains, across three sizes and twelve placements, with an optional arrow.",
    key: "tooltip",
  },
  {
    href: "/popover",
    label: "Popover",
    summary:
      "A titled panel anchored to whatever opened it, across three sizes and twelve placements, with an arrow and a modal mode.",
    key: "popover",
  },
  {
    href: "/tabs",
    label: "Tabs",
    summary:
      "A row of triggers and the panel the selected one shows, in two variants across three sizes and seven colors.",
    key: "tabs",
  },
  {
    href: "/radio-group",
    label: "RadioGroup",
    summary:
      "A legend and the options under it, across five sizes and seven colors, with a description per option.",
    key: "radioGroup",
  },
  {
    href: "/progress",
    label: "Progress",
    summary:
      "A track and the part of it that is done, across five thicknesses and seven colors, with an indeterminate state.",
    key: "progress",
  },
  {
    href: "/slider",
    label: "Slider",
    summary:
      "A track and a thumb per value, across five thicknesses and seven colors, with marks and a two-thumb range.",
    key: "slider",
  },
];
