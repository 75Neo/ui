import { inject, type InjectionKey } from "vue";
import { floatingPanelDefaults, type FloatingPanelSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface FloatingPanelVariants {
  size: FloatingPanelSize;
}

export const floatingPanelVariantsKey: InjectionKey<FloatingPanelVariants> =
  Symbol("floating-panel-variants");

/** Read the root's design axis. Outside a root this is the default. */
export function useFloatingPanelVariants(): FloatingPanelVariants {
  return inject(floatingPanelVariantsKey, floatingPanelDefaults);
}
