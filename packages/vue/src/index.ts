export { default as Button } from "./components/Button.vue";
export { default as Accordion } from "./components/Accordion.vue";
export { default as AngleSlider } from "./components/AngleSlider.vue";
export { default as Avatar } from "./components/Avatar.vue";
export { default as Carousel } from "./components/Carousel.vue";
export { default as Theme } from "./components/Theme.vue";
export { provideThemeContext, injectThemeContext, type ThemeContext } from "./composables/useTheme";
export { useComponentUI } from "./composables/useComponentUI";

// The shared contract, re-exported so React and Vue publish identical type names.
export type {
  SlotClass,
  ComponentUI,
  ThemeUI,
  AccordionItemData,
  AccordionUI,
  AngleSliderUI,
  AvatarUI,
  ButtonUI,
  CarouselItemData,
  CarouselUI,
} from "@75neo/core";
