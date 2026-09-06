/**
 * The components that have a live specimen. Kept beside `Preview.astro` rather than
 * inside it: a client directive has to name its component through a static import, so
 * the switch is written out there, once per adapter, and the names it covers here.
 */
export const previewed = new Set([
  "Accordion",
  "Button",
  "Clipboard",
  "TableOfContents",
  "Combobox",
  "Editable",
  "NumberInput",
  "PasswordInput",
  "PinInput",
  "TagsInput",
  "Listbox",
  "Menu",
  "Select",
  "Checkbox",
  "RadioGroup",
  "Switch",
  "SegmentGroup",
  "RatingGroup",
  "TreeView",
  "DatePicker",
  "DateInput",
  "ColorPicker",
  "Toggle",
  "ToggleGroup",
  "Tabs",
  "DownloadTrigger",
  "Dialog",
  "Drawer",
  "Popover",
  "HoverCard",
  "FloatingPanel",
  "Progress",
  "Steps",
  "Toast",
  "Tour",
]);

/** Whether a component has a live specimen on the reference page. */
export function hasPreview(name: string): boolean {
  return previewed.has(name);
}
