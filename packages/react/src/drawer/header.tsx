import type React from "react";
import { cn } from "@75neo/themes";

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function DrawerHeader({ className, children, ...rest }: DrawerHeaderProps) {
  return (
    <div
      {...rest}
      data-slot="drawer-header"
      className={cn("flex shrink-0 items-start gap-3 border-b border-muted px-5 py-4", className)}
    >
      {children}
    </div>
  );
}
