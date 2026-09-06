import { createContext, useContext } from "react";
import { tooltipDefaults, type TooltipVariants } from "@75neo/themes";

const TooltipVariantsContext = createContext<TooltipVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTooltipVariants(): TooltipVariants {
  return useContext(TooltipVariantsContext) ?? tooltipDefaults;
}

export { TooltipVariantsContext };
