import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";

export interface DialogTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
