import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import { radioGroup } from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function RadioGroupItemText({
  className,
  children,
  ...props
}: RadioGroupItemTextProps) {
  const styles = radioGroup();

  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
