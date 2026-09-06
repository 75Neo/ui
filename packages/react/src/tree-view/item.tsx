import type React from "react";
import { TreeView as Ark } from "@ark-ui/react/tree-view";
import { cva } from "class-variance-authority";
import { cn, treeViewDefaults, treeViewRowCompoundData, treeViewSizeData } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";

const treeViewItem = cva(
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
      size: treeViewSizeData.item,
    },
    compoundVariants: treeViewRowCompoundData,
    defaultVariants: treeViewDefaults,
  },
);

export interface TreeViewItemProps extends React.ComponentProps<typeof Ark.Item> {
  children?: React.ReactNode;
}

/**
 * One leaf. Custom composition belongs with Ark's own `NodeProvider` and collection
 * nodes; the root mapping below is how leaves are drawn from data.
 */
export function TreeViewItem({ className, children, ...rest }: TreeViewItemProps) {
  const variants = useTreeViewVariants();

  return (
    <Ark.Item
      {...rest}
      data-slot="tree-view-item"
      className={cn(treeViewItem(variants), className)}
    >
      {children}
    </Ark.Item>
  );
}
