import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "@75neo/themes";

export interface EditableControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function EditableControl({ className, children, ...rest }: EditableControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="editable-control"
      className={cn("col-start-2 row-start-1 flex items-center gap-1", className)}
    >
      {children}
    </Ark.Control>
  );
}
