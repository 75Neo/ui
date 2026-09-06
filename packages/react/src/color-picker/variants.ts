import { createContext, useContext } from "react";
import { colorPickerDefaults, type ColorPickerSize } from "@75neo/themes";

/** What the root publishes and every part reads: size alone. */
export interface ColorPickerVariants {
  size: ColorPickerSize;
}

const ColorPickerVariantsContext = createContext<ColorPickerVariants | null>(null);

/** Read the root's design axis. Outside a root this is the default. */
export function useColorPickerVariants(): ColorPickerVariants {
  return useContext(ColorPickerVariantsContext) ?? colorPickerDefaults;
}

export { ColorPickerVariantsContext };
