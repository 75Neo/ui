import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewBranchContentProps extends React.ComponentPropsWithRef<
  typeof Ark.BranchContent
> {}

export default function TreeViewBranchContent({
  className,
  children,
  ...props
}: TreeViewBranchContentProps) {
  return (
    <Ark.BranchContent className={cn(styles.branchContent(), className)} {...props}>
      {children}
    </Ark.BranchContent>
  );
}
