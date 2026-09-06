import { inject, type InjectionKey } from "vue";
import { swapDefaults, type SwapVariants } from "@75neo/themes";

export const swapVariantsKey: InjectionKey<SwapVariants> = Symbol("swap-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSwapVariants(): SwapVariants {
  return inject(swapVariantsKey, swapDefaults);
}
