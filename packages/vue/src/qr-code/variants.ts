import { inject, type InjectionKey } from "vue";
import { qrCodeDefaults, type QrCodeVariants } from "@75neo/themes";

export const qrCodeVariantsKey: InjectionKey<QrCodeVariants> = Symbol("qr-code-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useQrCodeVariants(): QrCodeVariants {
  return inject(qrCodeVariantsKey, qrCodeDefaults);
}
