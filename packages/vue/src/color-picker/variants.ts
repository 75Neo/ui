import { inject, type InjectionKey } from "vue";
import { colorPickerDefaults, type ColorPickerSize } from "@75neo/themes";

/** What the root publishes and every part reads: size alone. */
export interface ColorPickerVariants {
  size: ColorPickerSize;
}

export const colorPickerVariantsKey: InjectionKey<ColorPickerVariants> =
  Symbol("color-picker-variants");

/** Read the root's design axis. Outside a root this is the default. */
export function useColorPickerVariants(): ColorPickerVariants {
  return inject(colorPickerVariantsKey, colorPickerDefaults);
}
