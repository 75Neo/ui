import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewBranchTextProps extends React.ComponentPropsWithRef<
  typeof Ark.BranchText
> {}

export default function TreeViewBranchText({
  className,
  children,
  ...props
}: TreeViewBranchTextProps) {
  const styles = treeView();

  return (
    <Ark.BranchText className={cn(styles.branchText(), className)} {...props}>
      {children}
    </Ark.BranchText>
  );
}
