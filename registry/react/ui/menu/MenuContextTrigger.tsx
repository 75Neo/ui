import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";

export interface MenuContextTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ContextTrigger
> {}

export default function MenuContextTrigger({ children, ...props }: MenuContextTriggerProps) {
  return <Ark.ContextTrigger {...props}>{children}</Ark.ContextTrigger>;
}
