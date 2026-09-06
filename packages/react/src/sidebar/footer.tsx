import type React from "react";
import { cn, sidebarClasses } from "@75neo/themes";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, children, ...rest }: SidebarFooterProps) {
  return (
    <div {...rest} data-slot="sidebar-footer" className={cn(sidebarClasses.footer, className)}>
      {children}
    </div>
  );
}
