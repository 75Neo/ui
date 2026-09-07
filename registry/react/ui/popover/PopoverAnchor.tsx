import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";

export interface PopoverAnchorProps extends React.ComponentPropsWithRef<typeof Ark.Anchor> {}

export default function PopoverAnchor({ children, ...props }: PopoverAnchorProps) {
  return <Ark.Anchor {...props}>{children}</Ark.Anchor>;
}
