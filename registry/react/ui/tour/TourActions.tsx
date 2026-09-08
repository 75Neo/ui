import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";

export interface TourActionsProps extends React.ComponentProps<typeof Ark.Actions> {}

export default function TourActions({ children, ...props }: TourActionsProps) {
  return <Ark.Actions {...props}>{children}</Ark.Actions>;
}
