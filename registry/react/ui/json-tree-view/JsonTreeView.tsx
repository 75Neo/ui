import React from "react";
import { JsonTreeView as Ark } from "@ark-ui/react/json-tree-view";
import { cn } from "cn";
import { jsonTreeView } from "@/registry/shared/lib/json-tree-view.styles";

export interface JsonTreeViewProps extends React.ComponentProps<typeof Ark.Root> {}

export default function JsonTreeView({ className, children, ...props }: JsonTreeViewProps) {
  const styles = jsonTreeView();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
