import { inject, type InjectionKey } from "vue";
import { datePickerDefaults, type DatePickerColor, type DatePickerSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DatePickerVariants {
  color: DatePickerColor;
  size: DatePickerSize;
}

export const datePickerVariantsKey: InjectionKey<DatePickerVariants> =
  Symbol("date-picker-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDatePickerVariants(): DatePickerVariants {
  return inject(datePickerVariantsKey, datePickerDefaults);
}
