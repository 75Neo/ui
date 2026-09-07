import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";

export interface TooltipTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
