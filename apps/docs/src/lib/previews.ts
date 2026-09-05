/**
 * The components that have a live specimen. Kept beside `Preview.astro` rather than
 * inside it: a client directive has to name its component through a static import, so
 * the switch is written out there, once per adapter, and the names it covers here.
 */
export const previewed = new Set([
  "Accordion",
  "AngleSlider",
  "App",
  "Avatar",
  "Button",
  "Carousel",
  "Checkbox",
  "Clipboard",
  "Collapsible",
  "ColorPicker",
  "Combobox",
  "Container",
  "DateInput",
  "DatePicker",
  "Dialog",
  "Error",
  "FileUpload",
  "Footer",
  "Header",
  "Main",
  "Menu",
  "NumberInput",
  "Pagination",
  "PinInput",
  "Popover",
  "Progress",
  "RadioGroup",
  "SegmentGroup",
  "Select",
  "RatingGroup",
  "Sidebar",
  "Slider",
  "Switch",
  "TableOfContents",
  "Tabs",
  "TagsInput",
  "Tooltip",
]);

/** Whether a component has a live specimen on the reference page. */
export function hasPreview(name: string): boolean {
  return previewed.has(name);
}
