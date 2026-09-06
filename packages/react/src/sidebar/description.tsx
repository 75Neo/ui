import type React from "react";
import { cn, sidebarClasses } from "@75neo/themes";

export interface SidebarDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SidebarDescription({ className, children, ...rest }: SidebarDescriptionProps) {
  return (
    <p
      {...rest}
      data-slot="sidebar-description"
      className={cn(sidebarClasses.description, className)}
    >
      {children}
    </p>
  );
}
