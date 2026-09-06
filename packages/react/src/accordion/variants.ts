import { createContext, useContext } from "react";
import { accordionDefaults, type AccordionVariants } from "@75neo/themes";

const AccordionVariantsContext = createContext<AccordionVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAccordionVariants(): AccordionVariants {
  return useContext(AccordionVariantsContext) ?? accordionDefaults;
}

export { AccordionVariantsContext };
