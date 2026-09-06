import type React from "react";
import { cn, headerClasses } from "@75neo/themes";

export interface HeaderEndProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeaderEnd({ className, children, ...rest }: HeaderEndProps) {
  return (
    <div {...rest} data-slot="header-end" className={cn(headerClasses.end, className)}>
      {children}
    </div>
  );
}
