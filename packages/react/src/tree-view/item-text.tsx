import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "@75neo/themes";

export interface TreeViewItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function TreeViewItemText({ className, children, ...rest }: TreeViewItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="tree-view-item-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
