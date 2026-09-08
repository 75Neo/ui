import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "cn";
import { tooltipStyles as styles } from "@/registry/shared/lib/tooltip.styles";

export interface TooltipArrowTipProps extends React.ComponentPropsWithRef<typeof Ark.ArrowTip> {}

export default function TooltipArrowTip({ className, ...props }: TooltipArrowTipProps) {
  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
