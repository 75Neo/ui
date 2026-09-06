import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function SelectControl({ className, children, ...rest }: SelectControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="select-control"
      className={cn("relative flex w-full min-w-0 items-center", className)}
    >
      {children}
    </Ark.Control>
  );
}
