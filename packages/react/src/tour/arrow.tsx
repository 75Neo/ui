import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourArrowProps extends React.ComponentProps<typeof Ark.Arrow> {}

export function TourArrow({ className, children, ...rest }: TourArrowProps) {
  return (
    <Ark.Arrow
      {...rest}
      data-slot="tour-arrow"
      className={cn("[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]", className)}
    >
      {children ?? <Ark.ArrowTip data-slot="tour-arrow-tip" className={cn("")} />}
    </Ark.Arrow>
  );
}
