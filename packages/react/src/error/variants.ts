import { createContext, useContext } from "react";
import { errorDefaults, type ErrorVariants } from "@75neo/themes";

const ErrorVariantsContext = createContext<ErrorVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useErrorVariants(): ErrorVariants {
  return useContext(ErrorVariantsContext) ?? errorDefaults;
}

export { ErrorVariantsContext };
