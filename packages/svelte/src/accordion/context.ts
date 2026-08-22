import type { accordion } from "@75neo/styles/recipes";
import { getContext, setContext } from "svelte";

export type AccordionSlots = ReturnType<typeof accordion>;

const key = Symbol("neo-accordion");

/**
 * `Root` resolves the slot recipe once and publishes the class names it produced, so
 * `size`, `variant` and `colorPalette` are set in one place and every part below reads
 * its own class from here.
 *
 * A getter is stored rather than the value itself: `$derived` state read through a
 * function stays reactive across the context boundary, whereas the snapshot taken at
 * `setContext` time would not be.
 */
export const setAccordionSlots = (slots: () => AccordionSlots) => {
  setContext(key, slots);
};

export const getAccordionSlots = (part: string): (() => AccordionSlots) => {
  const slots = getContext<(() => AccordionSlots) | undefined>(key);

  if (!slots) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return slots;
};
