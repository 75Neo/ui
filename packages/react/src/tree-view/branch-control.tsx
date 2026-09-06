import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cva } from "class-variance-authority";
import { cn, treeViewDefaults, treeViewRowCompoundData, treeViewSizeData } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";

const treeViewBranchControl = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 ps-[calc(var(--depth,0)*0.875rem+0.5rem)] text-sm text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:outline-3 focus-visible:outline-primary/25 data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: treeViewSizeData.branchControl,
    },
    compoundVariants: treeViewRowCompoundData,
    defaultVariants: treeViewDefaults,
  },
);

export interface TreeViewBranchControlProps extends React.ComponentProps<typeof Ark.BranchControl> {
  children?: React.ReactNode;
}

export function TreeViewBranchControl({
  className,
  children,
  ...rest
}: TreeViewBranchControlProps) {
  const variants = useTreeViewVariants();

  return (
    <Ark.BranchControl
      {...rest}
      data-slot="tree-view-branch-control"
      className={cn(treeViewBranchControl(variants), className)}
    >
      {children}
    </Ark.BranchControl>
  );
}
