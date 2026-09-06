import { inject, type InjectionKey } from "vue";
import { marqueeDefaults, type MarqueeVariants } from "@75neo/themes";

export const marqueeVariantsKey: InjectionKey<MarqueeVariants> = Symbol("marquee-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function useMarqueeVariants(): MarqueeVariants {
  return inject(marqueeVariantsKey, marqueeDefaults);
}
