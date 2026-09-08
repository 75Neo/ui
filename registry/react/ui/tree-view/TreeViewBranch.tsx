import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";

export interface TreeViewBranchProps extends React.ComponentPropsWithRef<typeof Ark.Branch> {}

export default function TreeViewBranch({ children, ...props }: TreeViewBranchProps) {
  return <Ark.Branch {...props}>{children}</Ark.Branch>;
}
