import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";

export interface PopoverProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Popover({ children, ...props }: PopoverProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
