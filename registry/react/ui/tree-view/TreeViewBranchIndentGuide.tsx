import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewBranchIndentGuideProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.BranchIndentGuide>,
  "children"
> {}

export default function TreeViewBranchIndentGuide({
  className,
  ...props
}: TreeViewBranchIndentGuideProps) {
  const styles = treeView();

  return <Ark.BranchIndentGuide className={cn(styles.branchIndentGuide(), className)} {...props} />;
}
