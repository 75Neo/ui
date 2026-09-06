import { createContext, useContext } from "react";
import { qrCodeDefaults, type QrCodeVariants } from "@75neo/themes";

const QrCodeVariantsContext = createContext<QrCodeVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useQrCodeVariants(): QrCodeVariants {
  return useContext(QrCodeVariantsContext) ?? qrCodeDefaults;
}

export { QrCodeVariantsContext };
