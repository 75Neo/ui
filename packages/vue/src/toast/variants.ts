import { inject, type InjectionKey } from "vue";
import { toastDefaults, type ToastSize } from "@75neo/themes";

/** What the toaster publishes and every part reads. */
export interface ToastVariants {
  size: ToastSize;
}

export const toastVariantsKey: InjectionKey<ToastVariants> = Symbol("toast-variants");

/** Read the toaster's design axis. Outside a toaster this is the default. */
export function useToastVariants(): ToastVariants {
  return inject(toastVariantsKey, toastDefaults);
}
