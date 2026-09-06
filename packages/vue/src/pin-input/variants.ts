import { inject, type InjectionKey } from "vue";
import { pinInputDefaults, type PinInputColor, type PinInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface PinInputVariants {
  color: PinInputColor;
  size: PinInputSize;
}

export const pinInputVariantsKey: InjectionKey<PinInputVariants> = Symbol("pin-input-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePinInputVariants(): PinInputVariants {
  return inject(pinInputVariantsKey, pinInputDefaults);
}
