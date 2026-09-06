import type React from "react";
import { cn, headerClasses } from "@75neo/themes";

export interface HeaderCenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeaderCenter({ className, children, ...rest }: HeaderCenterProps) {
  return (
    <div {...rest} data-slot="header-center" className={cn(headerClasses.center, className)}>
      {children}
    </div>
  );
}
