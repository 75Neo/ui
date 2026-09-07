import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cn } from "cn";
import { checkbox } from "@/registry/shared/lib/checkbox.styles";

export interface CheckboxControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function CheckboxControl({ className, children, ...props }: CheckboxControlProps) {
  const styles = checkbox();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
