import { createContext, useContext } from "react";
import { toastDefaults, type ToastSize } from "@75neo/themes";

/** What the toaster publishes and every part reads. */
export interface ToastVariants {
  size: ToastSize;
}

const ToastVariantsContext = createContext<ToastVariants | null>(null);

/** Read the toaster's design axis. Outside a toaster this is the default. */
export function useToastVariants(): ToastVariants {
  return useContext(ToastVariantsContext) ?? toastDefaults;
}

export { ToastVariantsContext };
