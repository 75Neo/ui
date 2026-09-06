import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "@75neo/themes";

export interface TreeViewLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function TreeViewLabel({ className, children, ...rest }: TreeViewLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="tree-view-label"
      className={cn("px-2 text-xs font-semibold text-dimmed", className)}
    >
      {children}
    </Ark.Label>
  );
}
