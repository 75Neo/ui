import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "cn";
import { tooltipStyles as styles } from "@/registry/shared/lib/tooltip.styles";

export interface TooltipArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function TooltipArrow({ className, children, ...props }: TooltipArrowProps) {
  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
