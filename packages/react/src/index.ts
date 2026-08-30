export { Button, type ButtonProps } from "./components/Button";
export {
  Accordion,
  type AccordionProps,
  type AccordionItem,
  type AccordionSlotBag,
} from "./components/Accordion";
export {
  AngleSlider,
  type AngleSliderProps,
  type AngleSliderValueBag,
} from "./components/AngleSlider";
export { Avatar, type AvatarProps } from "./components/Avatar";
export {
  Carousel,
  type CarouselProps,
  type CarouselItem,
  type CarouselSlotBag,
} from "./components/Carousel";
export { Theme, type ThemeProps } from "./components/Theme";
export {
  ThemeProvider,
  type ThemeProviderProps,
  useThemeContext,
  type ThemeContextValue,
} from "./context/ThemeContext";
export { useComponentUI } from "./hooks/useComponentUI";
export { renderSlot, type Slot } from "./utils/renderSlot";

// The shared contract, re-exported so React and Vue publish identical type names.
export type {
  SlotClass,
  ComponentUI,
  ThemeUI,
  AccordionUI,
  AngleSliderUI,
  AvatarUI,
  ButtonUI,
  CarouselUI,
} from "@75neo/core";
