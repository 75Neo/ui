import { inject, type InjectionKey } from "vue";
import { headerDefaults, type HeaderVariants } from "@75neo/themes";

/** What the root publishes, plus the menu state the toggle and the panel share. */
export interface HeaderContextValue extends HeaderVariants {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
}

export const headerVariantsKey: InjectionKey<HeaderContextValue> = Symbol("header-variants");

/** Read the root's design axes and menu state. Outside a root these are the defaults. */
export function useHeaderVariants(): HeaderContextValue {
  return inject(headerVariantsKey, {
    ...headerDefaults,
    open: false,
    setOpen: () => {},
  });
}
