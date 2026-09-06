import type React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "@75neo/themes";

export interface RatingGroupLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function RatingGroupLabel({ className, children, ...rest }: RatingGroupLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="rating-group-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
