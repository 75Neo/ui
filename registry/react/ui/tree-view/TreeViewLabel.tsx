import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function TreeViewLabel({ className, children, ...props }: TreeViewLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
