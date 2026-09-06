import { inject, type InjectionKey } from "vue";
import { popoverDefaults, type PopoverSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface PopoverVariants {
  size: PopoverSize;
  close: boolean;
}

export const popoverVariantsKey: InjectionKey<PopoverVariants> = Symbol("popover-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePopoverVariants(): PopoverVariants {
  return inject(popoverVariantsKey, popoverDefaults);
}
