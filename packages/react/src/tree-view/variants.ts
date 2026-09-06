import { createContext, useContext } from "react";
import { treeViewDefaults, type TreeViewColor, type TreeViewSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TreeViewVariants {
  color: TreeViewColor;
  size: TreeViewSize;
}

const TreeViewVariantsContext = createContext<TreeViewVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTreeViewVariants(): TreeViewVariants {
  return useContext(TreeViewVariantsContext) ?? treeViewDefaults;
}

export { TreeViewVariantsContext };
