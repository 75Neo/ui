import { inject, type InjectionKey } from "vue";
import { treeViewDefaults, type TreeViewColor, type TreeViewSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TreeViewVariants {
  color: TreeViewColor;
  size: TreeViewSize;
}

export const treeViewVariantsKey: InjectionKey<TreeViewVariants> = Symbol("tree-view-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTreeViewVariants(): TreeViewVariants {
  return inject(treeViewVariantsKey, treeViewDefaults);
}
