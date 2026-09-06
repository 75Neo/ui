import { createContext, useContext } from "react";
import { dateInputDefaults, type DateInputColor, type DateInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DateInputVariants {
  color: DateInputColor;
  size: DateInputSize;
}

const DateInputVariantsContext = createContext<DateInputVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDateInputVariants(): DateInputVariants {
  return useContext(DateInputVariantsContext) ?? dateInputDefaults;
}

export { DateInputVariantsContext };
