import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverArrowTipProps extends React.ComponentPropsWithRef<typeof Ark.ArrowTip> {}

export default function PopoverArrowTip({ className, ...props }: PopoverArrowTipProps) {
  const styles = popover();

  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
