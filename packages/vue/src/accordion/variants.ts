import { inject, type InjectionKey } from "vue";
import { accordionDefaults, type AccordionVariants } from "@75neo/themes";

export const accordionVariantsKey: InjectionKey<AccordionVariants> = Symbol("accordion-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAccordionVariants(): AccordionVariants {
  return inject(accordionVariantsKey, accordionDefaults);
}
