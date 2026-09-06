import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { cn, treeViewDefaults, treeViewSizeData } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";

const treeViewBranchIndicator = cva(
  "shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-90 [&>svg]:size-full",
  {
    variants: { size: treeViewSizeData.branchIndicator },
    defaultVariants: treeViewDefaults,
  },
);

export interface TreeViewBranchIndicatorProps extends React.ComponentProps<
  typeof Ark.BranchIndicator
> {
  children?: React.ReactNode;
}

export function TreeViewBranchIndicator({
  className,
  children,
  ...rest
}: TreeViewBranchIndicatorProps) {
  const variants = useTreeViewVariants();

  return (
    <Ark.BranchIndicator
      {...rest}
      data-slot="tree-view-branch-indicator"
      className={cn(treeViewBranchIndicator(variants), className)}
    >
      {children ?? <ChevronRight />}
    </Ark.BranchIndicator>
  );
}
