import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cn } from "cn";
import { checkbox } from "@/registry/shared/lib/checkbox.styles";

export interface CheckboxLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function CheckboxLabel({ className, children, ...props }: CheckboxLabelProps) {
  const styles = checkbox();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
