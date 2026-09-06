import { useMemo } from "react";
import type React from "react";
import { createTreeCollection, TreeView as Ark } from "@ark-ui/react/tree-view";
import {
  cn,
  treeViewDefaults,
  type TreeViewNode,
  type TreeViewRootProps as TreeViewContract,
} from "@75neo/themes";
import { TreeViewVariantsContext } from "./variants";
import { TreeViewLabel } from "./label";
import { TreeViewTree } from "./tree";
import { BranchRows } from "./rows";

/** The node shape this adapter builds its collection from. */
type Node = TreeViewNode<React.ReactNode>;

/**
 * Props for the TreeView.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 *
 * Selection and expansion come from Ark, because React and Vue spell a controlled
 * value too differently to share one type. The collection is built from `items`
 * inside the component, so callers never meet `createTreeCollection`.
 */
export interface TreeViewProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      | "expandedValue"
      | "defaultExpandedValue"
      | "onExpandedChange"
      | "selectedValue"
      | "defaultSelectedValue"
      | "onSelectionChange"
      | "ids"
    >,
    TreeViewContract<React.ReactNode> {}

export function TreeView({
  color,
  size,
  items,
  label,
  branchIndicatorIcon,
  selectionMode,
  lazyMount,
  unmountOnExit,
  expandedValue,
  defaultExpandedValue,
  onExpandedChange,
  selectedValue,
  defaultSelectedValue,
  onSelectionChange,
  ids,
  className,
  ...rest
}: TreeViewProps) {
  const resolved = {
    color: color ?? treeViewDefaults.color,
    size: size ?? treeViewDefaults.size,
  };

  /*
   * Ark's tree runs on a collection, and the collection is derived state: rebuilt only
   * when the items change, so expansion and selection survive re-renders.
   */
  const collection = useMemo(
    () =>
      createTreeCollection<Node>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        rootNode: { value: "__root__", label: "", children: items },
      }),
    [items],
  );

  return (
    <TreeViewVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="tree-view"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex min-w-0 flex-col gap-1", className)}
        collection={collection}
        selectionMode={selectionMode}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        expandedValue={expandedValue}
        defaultExpandedValue={defaultExpandedValue}
        onExpandedChange={onExpandedChange}
        selectedValue={selectedValue}
        defaultSelectedValue={defaultSelectedValue}
        onSelectionChange={onSelectionChange}
        ids={ids}
      >
        {label != null && <TreeViewLabel>{label}</TreeViewLabel>}
        <TreeViewTree>
          <BranchRows
            nodes={collection.rootNode.children ?? []}
            indexPath={[]}
            glyphs={{ branchIndicatorIcon }}
          />
        </TreeViewTree>
      </Ark.Root>
    </TreeViewVariantsContext.Provider>
  );
}
