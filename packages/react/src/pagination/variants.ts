import { createContext, useContext } from "react";
import { paginationDefaults, type PaginationVariants } from "@75neo/themes";

const PaginationVariantsContext = createContext<PaginationVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function usePaginationVariants(): PaginationVariants {
  return useContext(PaginationVariantsContext) ?? { ...paginationDefaults, linked: false };
}

export { PaginationVariantsContext };
