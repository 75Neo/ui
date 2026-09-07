import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";

export interface DialogProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Dialog({ children, ...props }: DialogProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
