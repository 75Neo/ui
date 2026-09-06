import type React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "@75neo/themes";

export interface DateInputLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function DateInputLabel({ className, children, ...rest }: DateInputLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="date-input-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
