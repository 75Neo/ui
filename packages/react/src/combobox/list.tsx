import type React from "react";
import { cn } from "@75neo/themes";

export interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComboboxList({ className, children, ...rest }: ComboboxListProps) {
  return (
    <div
      {...rest}
      data-slot="combobox-list"
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", className)}
    >
      {children}
    </div>
  );
}
