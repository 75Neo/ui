import type React from "react";
import { cn, sidebarClasses } from "@75neo/themes";

export interface SidebarTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SidebarTitle({ className, children, ...rest }: SidebarTitleProps) {
  return (
    <p {...rest} data-slot="sidebar-title" className={cn(sidebarClasses.title, className)}>
      {children}
    </p>
  );
}
