import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";

export interface TooltipProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Tooltip({ children, ...props }: TooltipProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
