import { createContext, useContext } from "react";
import { sidebarDefaults, type SidebarState, type SidebarVariants } from "@75neo/themes";

/** What the root publishes, plus the state every part reads off it. */
export interface SidebarContextValue extends SidebarVariants {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Whether the sidebar is currently a panel over the page. */
  mobile: boolean;
}

const SidebarVariantsContext = createContext<SidebarContextValue | null>(null);

/** Read the root's design axes and state. Outside a root these are the defaults. */
export function useSidebarVariants(): SidebarContextValue {
  return (
    useContext(SidebarVariantsContext) ?? {
      ...sidebarDefaults,
      state: "expanded",
      open: true,
      setOpen: () => {},
      mobile: false,
    }
  );
}

export { SidebarVariantsContext };
