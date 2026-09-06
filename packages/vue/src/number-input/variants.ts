import { inject, type InjectionKey } from "vue";
import {
  numberInputDefaults,
  type NumberInputColor,
  type NumberInputOrientation,
  type NumberInputSize,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface NumberInputVariants {
  color: NumberInputColor;
  size: NumberInputSize;
  orientation: NumberInputOrientation;
}

export const numberInputVariantsKey: InjectionKey<NumberInputVariants> =
  Symbol("number-input-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useNumberInputVariants(): NumberInputVariants {
  return inject(numberInputVariantsKey, numberInputDefaults);
}
