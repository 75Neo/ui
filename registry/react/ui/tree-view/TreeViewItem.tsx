import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function TreeViewItem({ className, children, ...props }: TreeViewItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
