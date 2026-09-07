import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";

export interface MenuTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function MenuTrigger({ children, ...props }: MenuTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
