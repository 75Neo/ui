import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SelectControl({ className, children, ...props }: SelectControlProps) {
  const styles = select();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
