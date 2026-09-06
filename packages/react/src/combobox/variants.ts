import { createContext, useContext } from "react";
import { comboboxDefaults, type ComboboxColor, type ComboboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ComboboxVariants {
  color: ComboboxColor;
  size: ComboboxSize;
}

const ComboboxVariantsContext = createContext<ComboboxVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useComboboxVariants(): ComboboxVariants {
  return useContext(ComboboxVariantsContext) ?? comboboxDefaults;
}

export { ComboboxVariantsContext };
