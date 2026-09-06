import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "@75neo/themes";

export interface EditableLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function EditableLabel({ className, children, ...rest }: EditableLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="editable-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
