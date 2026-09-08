import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewTreeProps extends React.ComponentPropsWithRef<typeof Ark.Tree> {}

export default function TreeViewTree({ className, children, ...props }: TreeViewTreeProps) {
  const styles = treeView();

  return (
    <Ark.Tree className={cn(styles.tree(), className)} {...props}>
      {children}
    </Ark.Tree>
  );
}
