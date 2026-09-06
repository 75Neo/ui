import { createContext, useContext } from "react";
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

const PasswordInputVariantsContext = createContext<PasswordInputVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePasswordInputVariants(): PasswordInputVariants {
  return useContext(PasswordInputVariantsContext) ?? passwordInputDefaults;
}

export { PasswordInputVariantsContext };
