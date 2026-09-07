import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";

export interface DrawerTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function DrawerTrigger({ children, ...props }: DrawerTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
