// Re-exported so previews and recipe tests can read a variant matrix off a recipe
// without depending on `@75neo/core` directly.
export { type Recipe, variantValues } from "@75neo/core";

export {
  byColor,
  type ComponentColor,
  componentColors,
  eachColor,
  type ThemeColor,
  themeColors,
} from "./colors";

export type { Placement } from "./placement";

export * from "./components/accordion";
export * from "./components/angle-slider";
export * from "./components/avatar";
export * from "./components/button";
export * from "./components/carousel";
export * from "./components/checkbox";
export * from "./components/clipboard";
export * from "./components/collapsible";
export * from "./components/color-picker";
export * from "./components/combobox";
export * from "./components/date-input";
export * from "./components/date-picker";
export * from "./components/dialog";
export * from "./components/popover";
export * from "./components/progress";
export * from "./components/radio-group";
export * from "./components/slider";
export * from "./components/switch";
export * from "./components/table-of-contents";
export * from "./components/tabs";
export * from "./components/tooltip";
