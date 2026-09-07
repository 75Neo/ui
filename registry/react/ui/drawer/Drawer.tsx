import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";

export interface DrawerProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Drawer({ children, ...props }: DrawerProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
