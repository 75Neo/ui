import { inject, type InjectionKey } from "vue";
import {
  passwordInputDefaults,
  type PasswordInputColor,
  type PasswordInputSize,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface PasswordInputVariants {
  color: PasswordInputColor;
  size: PasswordInputSize;
}

export const passwordInputVariantsKey: InjectionKey<PasswordInputVariants> =
  Symbol("password-input-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePasswordInputVariants(): PasswordInputVariants {
  return inject(passwordInputVariantsKey, passwordInputDefaults);
}
