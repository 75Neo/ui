import React from "react";
import { JsonTreeView as Ark } from "@ark-ui/react/json-tree-view";
import { cn } from "cn";
import { jsonTreeView } from "@/registry/shared/lib/json-tree-view.styles";

export interface JsonTreeViewTreeProps extends React.ComponentProps<typeof Ark.Tree> {}

export default function JsonTreeViewTree({ className, ...props }: JsonTreeViewTreeProps) {
  const styles = jsonTreeView();

  return <Ark.Tree className={cn(styles.tree(), className)} {...props} />;
}
