import type React from "react";
import { cn, headerClasses } from "@75neo/themes";

export interface HeaderRowProps extends React.HTMLAttributes<HTMLDivElement> {}

/** The bar's row, held to the Container's measure. */
export function HeaderRow({ className, children, ...rest }: HeaderRowProps) {
  return (
    <div {...rest} data-slot="header-row" className={cn(headerClasses.row, className)}>
      {children}
    </div>
  );
}
