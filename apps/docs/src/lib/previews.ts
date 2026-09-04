/**
 * The components that have a live specimen.
 *
 * @remarks
 * Kept beside `Preview.astro` rather than inside it, because a client directive has to
 * name its component through a static import: Astro cannot hydrate one reached through
 * a variable. So the switch is written out there — twice, once per adapter — and the
 * names it covers are listed here for the pages that need to ask.
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
  "Select",
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
