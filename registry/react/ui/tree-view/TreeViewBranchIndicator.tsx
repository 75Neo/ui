import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewBranchIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.BranchIndicator
> {}

export default function TreeViewBranchIndicator({
  className,
  children,
  ...props
}: TreeViewBranchIndicatorProps) {
  return (
    <Ark.BranchIndicator className={cn(styles.branchIndicator(), className)} {...props}>
      {children}
    </Ark.BranchIndicator>
  );
}
