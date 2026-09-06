import type React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "@75neo/themes";

export interface RadioGroupLegendProps extends React.ComponentProps<typeof Ark.Label> {}

export function RadioGroupLegend({ className, children, ...rest }: RadioGroupLegendProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="radio-group-legend"
      className={cn(
        "font-medium text-highlighted select-none group-data-[orientation=horizontal]/radio:sr-only",
        className,
      )}
    >
      {children}
    </Ark.Label>
  );
}
