import type React from "react";
import { useMemo } from "react";
import {
  TreeView as Ark,
  createTreeCollection,
  type TreeViewRootProps,
} from "@ark-ui/react/tree-view";
import { ChevronRight } from "lucide-react";
import { treeView, type TreeViewItem, type TreeViewProps as TreeViewContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** One node, with the framework's icon type filled in. */
type TreeNode = TreeViewItem<React.ReactNode>;

/**
 * Props for the TreeView.
 *
 * @remarks
 * The selection and the expansion come from Ark, because React and Vue spell a
 * controlled value too differently to share one type. The collection is built from
 * `items` inside the component, so callers never meet `createTreeCollection`: a node
 * is a branch when it has children.
 */
export interface TreeViewProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir">,
    Pick<
      TreeViewRootProps<TreeNode>,
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
  ui,
  color,
  size,
  indentGuide,
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
  const theme = useResolvedTheme(treeView, "treeView", { ui, color, size, indentGuide }, className);

  /*
   * Ark's tree runs on a collection, and the collection is derived state: rebuilt only
   * when the items change, so expansion and selection survive re-renders.
   */
  const collection = useMemo(
    () =>
      createTreeCollection<TreeNode>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        rootNode: { value: "__root__", label: "", children: items },
      }),
    [items],
  );

  const indicator = branchIndicatorIcon ?? <ChevronRight />;

  /*
   * React has no constraint on recursion, so the rows below are a local function
   * rather than a second file. Vue needs TreeViewRows.vue for the same job.
   */
  function renderRows(nodes: TreeNode[], indexPath: number[]) {
    return nodes.map((node, position) => {
      const path = [...indexPath, position];
      const icon =
        node.icon != null ? (
          <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
            {node.icon}
          </span>
        ) : null;

      return (
        <Ark.NodeProvider key={node.value} node={node} indexPath={path}>
          {node.children != null && node.children.length > 0 ? (
            <Ark.Branch data-slot="branch" className={theme.class.branch}>
              <Ark.BranchControl data-slot="branchControl" className={theme.class.branchControl}>
                <Ark.BranchIndicator
                  data-slot="branchIndicator"
                  className={theme.class.branchIndicator}
                >
                  {indicator}
                </Ark.BranchIndicator>
                {icon}
                <Ark.BranchText data-slot="branchText" className={theme.class.branchText}>
                  {node.label}
                </Ark.BranchText>
              </Ark.BranchControl>
              <Ark.BranchContent data-slot="branchContent" className={theme.class.branchContent}>
                {renderRows(node.children, path)}
              </Ark.BranchContent>
            </Ark.Branch>
          ) : (
            <Ark.Item data-slot="item" className={theme.class.item}>
              {icon}
              <Ark.ItemText data-slot="itemText" className={theme.class.itemText}>
                {node.label}
              </Ark.ItemText>
            </Ark.Item>
          )}
        </Ark.NodeProvider>
      );
    });
  }

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
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
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}
      <Ark.Tree data-slot="tree" className={theme.class.tree}>
        {renderRows(collection.rootNode.children ?? [], [])}
      </Ark.Tree>
    </Ark.Root>
  );
}
