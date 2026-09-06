import type React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "@75neo/themes";

export interface TooltipArrowProps extends React.ComponentProps<typeof Ark.Arrow> {}

/**
 * The triangle pointing back at the trigger.
 *
 * @remarks
 * Two elements, because the tip has to rotate inside a box that does not. Ark reads
 * the size and the background off these two variables, so they are the whole of the
 * arrow's styling and the tip needs no classes.
 */
export function TooltipArrow({ className, ...rest }: TooltipArrowProps) {
  return (
    <Ark.Arrow
      {...rest}
      data-slot="tooltip-arrow"
      className={cn("[--arrow-background:var(--ui-bg-inverted)] [--arrow-size:0.5rem]", className)}
    >
      <Ark.ArrowTip data-slot="tooltip-arrow-tip" />
    </Ark.Arrow>
  );
}
