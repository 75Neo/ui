import { inject, type InjectionKey } from "vue";
import { splitterDefaults, type SplitterVariants } from "@75neo/themes";

export const splitterVariantsKey: InjectionKey<SplitterVariants> = Symbol("splitter-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSplitterVariants(): SplitterVariants {
  return inject(splitterVariantsKey, splitterDefaults);
}
