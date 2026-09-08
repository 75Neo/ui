import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewBranchControlProps extends React.ComponentPropsWithRef<
  typeof Ark.BranchControl
> {}

export default function TreeViewBranchControl({
  className,
  children,
  ...props
}: TreeViewBranchControlProps) {
  return (
    <Ark.BranchControl className={cn(styles.branchControl(), className)} {...props}>
      {children}
    </Ark.BranchControl>
  );
}
