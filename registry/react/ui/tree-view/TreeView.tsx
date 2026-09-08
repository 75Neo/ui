import React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

export interface TreeViewProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function TreeView({ className, children, ...props }: TreeViewProps) {
  const styles = treeView();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
