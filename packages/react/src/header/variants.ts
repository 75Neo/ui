import { createContext, useContext } from "react";
import { headerDefaults, type HeaderVariants } from "@75neo/themes";

/** What the root publishes, plus the menu state the toggle and the panel share. */
export interface HeaderContextValue extends HeaderVariants {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
}

const HeaderVariantsContext = createContext<HeaderContextValue | null>(null);

/** Read the root's design axes and menu state. Outside a root these are the defaults. */
export function useHeaderVariants(): HeaderContextValue {
  return (
    useContext(HeaderVariantsContext) ?? {
      ...headerDefaults,
      open: false,
      setOpen: () => {},
    }
  );
}

export { HeaderVariantsContext };
