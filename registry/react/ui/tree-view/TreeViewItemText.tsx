import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function TreeViewItemText({ className, children, ...props }: TreeViewItemTextProps) {
  const styles = treeView();

  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
