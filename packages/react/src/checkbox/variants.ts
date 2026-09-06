import { createContext, useContext } from "react";
import { checkboxDefaults, type CheckboxColor, type CheckboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface CheckboxVariants {
  color: CheckboxColor;
  size: CheckboxSize;
}

const CheckboxVariantsContext = createContext<CheckboxVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCheckboxVariants(): CheckboxVariants {
  return useContext(CheckboxVariantsContext) ?? checkboxDefaults;
}

export { CheckboxVariantsContext };
