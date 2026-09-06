import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn, treeViewSizeData, type TreeViewNode } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";
import { TreeViewBranch } from "./branch";
import { TreeViewBranchContent } from "./branch-content";
import { TreeViewBranchControl } from "./branch-control";
import { TreeViewBranchIndicator } from "./branch-indicator";
import { TreeViewBranchText } from "./branch-text";
import { TreeViewItem } from "./item";
import { TreeViewItemText } from "./item-text";

export interface BranchRowsGlyphs {
  branchIndicatorIcon: React.ReactNode;
}

function LeadingIcon({ icon }: { icon: React.ReactNode }) {
  const variants = useTreeViewVariants();

  return (
    <span
      data-slot="tree-view-leading-icon"
      className={cn(
        "shrink-0 text-dimmed [&>svg]:size-full",
        treeViewSizeData.leadingIcon[variants.size],
      )}
    >
      {icon}
    </span>
  );
}

function BranchRow({
  node,
  indexPath,
  glyphs,
}: {
  node: TreeViewNode<React.ReactNode>;
  indexPath: number[];
  glyphs: BranchRowsGlyphs;
}) {
  const icon = node.icon != null && <LeadingIcon icon={node.icon} />;

  return (
    <Ark.NodeProvider key={node.value} node={node} indexPath={indexPath}>
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator>{glyphs.branchIndicatorIcon}</TreeViewBranchIndicator>
          {icon}
          <TreeViewBranchText>{node.label}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <BranchRows nodes={node.children ?? []} indexPath={indexPath} glyphs={glyphs} />
        </TreeViewBranchContent>
      </TreeViewBranch>
    </Ark.NodeProvider>
  );
}

function ItemRow({
  node,
  indexPath,
}: {
  node: TreeViewNode<React.ReactNode>;
  indexPath: number[];
}) {
  const icon = node.icon != null && <LeadingIcon icon={node.icon} />;

  return (
    <Ark.NodeProvider key={node.value} node={node} indexPath={indexPath}>
      <TreeViewItem>
        {icon}
        <TreeViewItemText>{node.label}</TreeViewItemText>
      </TreeViewItem>
    </Ark.NodeProvider>
  );
}

/**
 * Maps data nodes to rows, branches recursing. Internal: callers compose the
 * exported parts, never this.
 */
export function BranchRows({
  nodes,
  indexPath,
  glyphs,
}: {
  nodes: TreeViewNode<React.ReactNode>[];
  indexPath: number[];
  glyphs: BranchRowsGlyphs;
}) {
  return nodes.map((node, position) => {
    const path = [...indexPath, position];

    if (node.children != null && node.children.length > 0) {
      return <BranchRow key={node.value} node={node} indexPath={path} glyphs={glyphs} />;
    }

    return <ItemRow key={node.value} node={node} indexPath={path} />;
  });
}
