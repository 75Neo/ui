import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "@75neo/themes";

export interface TreeViewTreeProps extends React.ComponentProps<typeof Ark.Tree> {}

export function TreeViewTree({ className, children, ...rest }: TreeViewTreeProps) {
  return (
    <Ark.Tree
      {...rest}
      data-slot="tree-view-tree"
      className={cn("flex min-w-0 flex-col gap-px outline-none", className)}
    >
      {children}
    </Ark.Tree>
  );
}
