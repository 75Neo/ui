import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";

export interface TourProps extends React.ComponentProps<typeof Ark.Root> {}

export default function Tour({ children, ...props }: TourProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
