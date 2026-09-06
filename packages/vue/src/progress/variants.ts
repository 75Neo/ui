import { inject, type InjectionKey } from "vue";
import { progressDefaults, type ProgressColor, type ProgressSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ProgressVariants {
  size: ProgressSize;
  color: ProgressColor;
}

export const progressVariantsKey: InjectionKey<ProgressVariants> = Symbol("progress-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function useProgressVariants(): ProgressVariants {
  return inject(progressVariantsKey, progressDefaults);
}
