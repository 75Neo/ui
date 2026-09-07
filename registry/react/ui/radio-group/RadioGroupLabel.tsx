import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import { radioGroup } from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function RadioGroupLabel({ className, children, ...props }: RadioGroupLabelProps) {
  const styles = radioGroup();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
