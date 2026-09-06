import { createContext, useContext } from "react";
import { dialogDefaults, type DialogSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DialogVariants {
  size: DialogSize;
}

const DialogVariantsContext = createContext<DialogVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDialogVariants(): DialogVariants {
  return useContext(DialogVariantsContext) ?? dialogDefaults;
}

export { DialogVariantsContext };
