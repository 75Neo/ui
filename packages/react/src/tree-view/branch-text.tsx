import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "@75neo/themes";

export interface TreeViewBranchTextProps extends React.ComponentProps<typeof Ark.BranchText> {}

export function TreeViewBranchText({ className, children, ...rest }: TreeViewBranchTextProps) {
  return (
    <Ark.BranchText
      {...rest}
      data-slot="tree-view-branch-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.BranchText>
  );
}
