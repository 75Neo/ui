import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cva } from "class-variance-authority";
import {
  cn,
  type TreeViewBranchContentProps as TreeViewBranchContentContract,
} from "@75neo/themes";

const treeViewBranchContent = cva("flex min-w-0 flex-col gap-px overflow-hidden", {
  variants: {
    indentGuide: {
      true: "ms-4 border-s border-muted ps-1.5",
      false: "",
    },
  },
  defaultVariants: { indentGuide: true },
});

export interface TreeViewBranchContentProps
  extends React.ComponentProps<typeof Ark.BranchContent>, TreeViewBranchContentContract {}

export function TreeViewBranchContent({
  indentGuide,
  className,
  children,
  ...rest
}: TreeViewBranchContentProps) {
  return (
    <Ark.BranchContent
      {...rest}
      data-slot="tree-view-branch-content"
      className={cn(treeViewBranchContent({ indentGuide }), className)}
    >
      {children}
    </Ark.BranchContent>
  );
}
