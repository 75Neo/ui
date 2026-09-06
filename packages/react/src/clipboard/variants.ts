import { createContext, useContext } from "react";
import { clipboardDefaults, type ClipboardColor, type ClipboardSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ClipboardVariants {
  color: ClipboardColor;
  size: ClipboardSize;
}

const ClipboardVariantsContext = createContext<ClipboardVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useClipboardVariants(): ClipboardVariants {
  return useContext(ClipboardVariantsContext) ?? clipboardDefaults;
}

export { ClipboardVariantsContext };
