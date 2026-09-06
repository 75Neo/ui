import { inject, type InjectionKey } from "vue";
import { dialogDefaults, type DialogSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DialogVariants {
  size: DialogSize;
}

export const dialogVariantsKey: InjectionKey<DialogVariants> = Symbol("dialog-variants");

/** Read the root's design axis. Outside a root this is the default. */
export function useDialogVariants(): DialogVariants {
  return inject(dialogVariantsKey, dialogDefaults);
}
