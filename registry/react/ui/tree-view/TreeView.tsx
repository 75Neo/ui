import React from "react";
import { TreeView as Ark, type TreeNode, type TreeViewRootProps } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewProps<T extends TreeNode>
  extends TreeViewRootProps<T>, React.RefAttributes<HTMLDivElement> {}

export default function TreeView<T extends TreeNode>({
  className,
  children,
  ...props
}: TreeViewProps<T>) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
