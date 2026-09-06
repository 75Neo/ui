import { inject, type InjectionKey } from "vue";
import { errorDefaults, type ErrorVariants } from "@75neo/themes";

export const errorVariantsKey: InjectionKey<ErrorVariants> = Symbol("error-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useErrorVariants(): ErrorVariants {
  return inject(errorVariantsKey, errorDefaults);
}
