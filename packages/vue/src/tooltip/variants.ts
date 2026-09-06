import { inject, type InjectionKey } from "vue";
import { tooltipDefaults, type TooltipVariants } from "@75neo/themes";

export const tooltipVariantsKey: InjectionKey<TooltipVariants> = Symbol("tooltip-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTooltipVariants(): TooltipVariants {
  return inject(tooltipVariantsKey, tooltipDefaults);
}
