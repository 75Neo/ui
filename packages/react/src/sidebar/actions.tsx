import type React from "react";
import { cva } from "class-variance-authority";
import { cn, sidebarClasses, sidebarCollapsibleData, sidebarDefaults } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarActions = cva(sidebarClasses.actions, {
  variants: { collapsible: sidebarCollapsibleData.actions },
  defaultVariants: sidebarDefaults,
});

export interface SidebarActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarActions({ className, children, ...rest }: SidebarActionsProps) {
  const { collapsible } = useSidebarVariants();

  return (
    <div
      {...rest}
      data-slot="sidebar-actions"
      className={cn(sidebarActions({ collapsible }), className)}
    >
      {children}
    </div>
  );
}
