import type React from "react";
import { cn, sidebarClasses } from "@75neo/themes";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, children, ...rest }: SidebarHeaderProps) {
  return (
    <div {...rest} data-slot="sidebar-header" className={cn(sidebarClasses.header, className)}>
      {children}
    </div>
  );
}
