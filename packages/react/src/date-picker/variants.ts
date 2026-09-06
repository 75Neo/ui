import { createContext, useContext } from "react";
import { datePickerDefaults, type DatePickerColor, type DatePickerSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DatePickerVariants {
  color: DatePickerColor;
  size: DatePickerSize;
}

const DatePickerVariantsContext = createContext<DatePickerVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDatePickerVariants(): DatePickerVariants {
  return useContext(DatePickerVariantsContext) ?? datePickerDefaults;
}

export { DatePickerVariantsContext };
