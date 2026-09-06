import type React from "react";
import { cn, headerClasses } from "@75neo/themes";

export interface HeaderStartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeaderStart({ className, children, ...rest }: HeaderStartProps) {
  return (
    <div {...rest} data-slot="header-start" className={cn(headerClasses.start, className)}>
      {children}
    </div>
  );
}
