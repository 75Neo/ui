import type React from "react";
import { cn } from "@75neo/themes";

export interface ToggleGroupItemTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function ToggleGroupItemText({ className, children, ...rest }: ToggleGroupItemTextProps) {
  return (
    <span {...rest} data-slot="toggle-group-item-text" className={cn("truncate", className)}>
      {children}
    </span>
  );
}
