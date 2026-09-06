import { inject, type InjectionKey } from "vue";
import { paginationDefaults, type PaginationVariants } from "@75neo/themes";

export const paginationVariantsKey: InjectionKey<PaginationVariants> =
  Symbol("pagination-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function usePaginationVariants(): PaginationVariants {
  return inject(paginationVariantsKey, { ...paginationDefaults, linked: false });
}
