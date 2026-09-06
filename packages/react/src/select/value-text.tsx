import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectValueTextProps extends React.ComponentProps<typeof Ark.ValueText> {}

export function SelectValueText({ className, children, ...rest }: SelectValueTextProps) {
  return (
    <Ark.ValueText
      {...rest}
      data-slot="select-value-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ValueText>
  );
}
