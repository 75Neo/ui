import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewItemIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemIndicator
> {}

export default function TreeViewItemIndicator({
  className,
  children,
  ...props
}: TreeViewItemIndicatorProps) {
  const styles = treeView();

  return (
    <Ark.ItemIndicator className={cn(styles.itemIndicator(), className)} {...props}>
      {children}
    </Ark.ItemIndicator>
  );
}
