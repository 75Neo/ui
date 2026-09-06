import { inject, type InjectionKey } from "vue";
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

export const tableOfContentsVariantsKey: InjectionKey<TableOfContentsVariants> = Symbol(
  "table-of-contents-variants",
);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTableOfContentsVariants(): TableOfContentsVariants {
  return inject(tableOfContentsVariantsKey, tableOfContentsDefaults);
}
