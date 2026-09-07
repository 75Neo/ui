import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

export interface TooltipArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function TooltipArrow({ className, children, ...props }: TooltipArrowProps) {
  const styles = tooltip();

  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
