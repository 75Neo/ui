import type { AccordionSlots, Themes } from "@75neo/styles";
import { getContext, setContext } from "svelte";

export type AccordionStyles = {
  slots: ReturnType<Themes["accordion"]>;
  ui: AccordionSlots | undefined;
};

const key = Symbol("neo-accordion");

/**
 * `Root` resolves the theme once and publishes the slot functions it produced together
 * with whatever `ui` it was given, so `size`, `variant`, `colorPalette` and every
 * per-slot override are set in one place and each part below reads its own class here.
 *
 * A getter is stored rather than the value itself: `$derived` state read through a
 * function stays reactive across the context boundary, whereas the snapshot taken at
 * `setContext` time would not be.
 */
export const setAccordionStyles = (styles: () => AccordionStyles) => {
  setContext(key, styles);
};

export const getAccordionStyles = (part: string): (() => AccordionStyles) => {
  const styles = getContext<(() => AccordionStyles) | undefined>(key);

  if (!styles) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return styles;
};
