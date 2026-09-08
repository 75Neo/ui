import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SelectControl({ className, children, ...props }: SelectControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
