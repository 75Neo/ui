import { inject, type InjectionKey } from "vue";
import { switchDefaults, type SwitchColor, type SwitchSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface SwitchVariants {
  color: SwitchColor;
  size: SwitchSize;
  loading: boolean;
}

export const switchVariantsKey: InjectionKey<SwitchVariants> = Symbol("switch-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSwitchVariants(): SwitchVariants {
  return inject(switchVariantsKey, switchDefaults);
}
