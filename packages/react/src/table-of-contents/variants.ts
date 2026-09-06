import { createContext, useContext } from "react";
import {
  tableOfContentsDefaults,
  type TableOfContentsColor,
  type TableOfContentsSize,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TableOfContentsVariants {
  color: TableOfContentsColor;
  size: TableOfContentsSize;
}

const TableOfContentsVariantsContext = createContext<TableOfContentsVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTableOfContentsVariants(): TableOfContentsVariants {
  return useContext(TableOfContentsVariantsContext) ?? tableOfContentsDefaults;
}

export { TableOfContentsVariantsContext };
