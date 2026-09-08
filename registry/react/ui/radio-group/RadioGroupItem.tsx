import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import { radioGroupStyles as styles } from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function RadioGroupItem({ className, children, ...props }: RadioGroupItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
