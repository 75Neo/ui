import { inject, type InjectionKey } from "vue";
import { stepsDefaults, type StepsColor, type StepsSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface StepsVariants {
  size: StepsSize;
  color: StepsColor;
}

export const stepsVariantsKey: InjectionKey<StepsVariants> = Symbol("steps-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function useStepsVariants(): StepsVariants {
  return inject(stepsVariantsKey, stepsDefaults);
}
