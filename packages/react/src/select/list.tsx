import type React from "react";
import { cn } from "@75neo/themes";

export interface SelectListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SelectList({ className, children, ...rest }: SelectListProps) {
  return (
    <div
      {...rest}
      data-slot="select-list"
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", className)}
    >
      {children}
    </div>
  );
}
