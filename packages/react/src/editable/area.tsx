import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "@75neo/themes";

export interface EditableAreaProps extends React.ComponentProps<typeof Ark.Area> {}

export function EditableArea({ className, children, ...rest }: EditableAreaProps) {
  return (
    <Ark.Area
      {...rest}
      data-slot="editable-area"
      className={cn(
        "grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
        className,
      )}
    >
      {children}
    </Ark.Area>
  );
}
