import { inject, type InjectionKey } from "vue";
import { listboxDefaults, type ListboxColor, type ListboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ListboxVariants {
  color: ListboxColor;
  size: ListboxSize;
}

export const listboxVariantsKey: InjectionKey<ListboxVariants> = Symbol("listbox-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useListboxVariants(): ListboxVariants {
  return inject(listboxVariantsKey, listboxDefaults);
}
