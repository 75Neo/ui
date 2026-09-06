import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "@75neo/themes";

export interface TreeViewBranchProps extends React.ComponentProps<typeof Ark.Branch> {
  children?: React.ReactNode;
}

/**
 * One branch shell. Custom composition belongs with Ark's own `NodeProvider` and
 * collection nodes; the root mapping below is how branches are drawn from data.
 */
export function TreeViewBranch({ className, children, ...rest }: TreeViewBranchProps) {
  return (
    <Ark.Branch
      {...rest}
      data-slot="tree-view-branch"
      className={cn("flex min-w-0 flex-col", className)}
    >
      {children}
    </Ark.Branch>
  );
}
