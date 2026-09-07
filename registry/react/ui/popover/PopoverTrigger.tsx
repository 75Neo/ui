import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";

export interface PopoverTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
