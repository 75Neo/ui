import { inject, type InjectionKey } from "vue";
import { clipboardDefaults, type ClipboardColor, type ClipboardSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ClipboardVariants {
  color: ClipboardColor;
  size: ClipboardSize;
}

export const clipboardVariantsKey: InjectionKey<ClipboardVariants> = Symbol("clipboard-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useClipboardVariants(): ClipboardVariants {
  return inject(clipboardVariantsKey, clipboardDefaults);
}
