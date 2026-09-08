import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function TreeViewLabel({ className, children, ...props }: TreeViewLabelProps) {
  const styles = treeView();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
