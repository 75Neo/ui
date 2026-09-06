import type React from "react";
import { cva } from "class-variance-authority";
import { cn, sidebarClasses, sidebarCollapsibleData, sidebarDefaults } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarBody = cva(sidebarClasses.body, {
  variants: { collapsible: sidebarCollapsibleData.body },
  defaultVariants: sidebarDefaults,
});

export interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarBody({ className, children, ...rest }: SidebarBodyProps) {
  const { collapsible } = useSidebarVariants();

  return (
    <div {...rest} data-slot="sidebar-body" className={cn(sidebarBody({ collapsible }), className)}>
      {children}
    </div>
  );
}
