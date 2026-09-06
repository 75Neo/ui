import { inject, type InjectionKey } from "vue";
import { hoverCardDefaults, type HoverCardSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface HoverCardVariants {
  size: HoverCardSize;
}

export const hoverCardVariantsKey: InjectionKey<HoverCardVariants> = Symbol("hover-card-variants");

/** Read the root's design axis. Outside a root this is the default. */
export function useHoverCardVariants(): HoverCardVariants {
  return inject(hoverCardVariantsKey, hoverCardDefaults);
}
