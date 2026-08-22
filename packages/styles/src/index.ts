export { resolveTheme, themes } from "./registry";
export type {
  SlotClasses,
  SlotName,
  ThemeConfig,
  ThemeName,
  ThemeOverride,
  Themes,
} from "./registry";
export { accordion } from "./themes/accordion";
export { button } from "./themes/button";
export { cn, cx, tv, twMergeConfig } from "./tv";
export type { ClassValue, VariantProps } from "tailwind-variants";

import type { SlotClasses } from "./registry";
import type { accordion } from "./themes/accordion";
import type { button } from "./themes/button";
import type { VariantProps } from "tailwind-variants";

/** The variant props every framework's `<Button>` accepts. */
export type ButtonVariants = VariantProps<typeof button>;
/** The `ui` prop of every framework's `<Button>`. */
export type ButtonSlots = SlotClasses<typeof button>;

/** The variant props every framework's `<Accordion>` accepts. */
export type AccordionVariants = VariantProps<typeof accordion>;
/** The `ui` prop of every framework's `<Accordion>`. */
export type AccordionSlots = SlotClasses<typeof accordion>;
