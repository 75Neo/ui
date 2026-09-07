import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";

export interface MenuProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Menu({ children, ...props }: MenuProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
