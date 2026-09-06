import { inject, type InjectionKey } from "vue";
import { dateInputDefaults, type DateInputColor, type DateInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DateInputVariants {
  color: DateInputColor;
  size: DateInputSize;
}

export const dateInputVariantsKey: InjectionKey<DateInputVariants> = Symbol("date-input-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDateInputVariants(): DateInputVariants {
  return inject(dateInputVariantsKey, dateInputDefaults);
}
