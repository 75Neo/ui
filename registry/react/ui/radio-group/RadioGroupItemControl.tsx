import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import { radioGroupStyles as styles } from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupItemControlProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemControl
> {}

export default function RadioGroupItemControl({ className, ...props }: RadioGroupItemControlProps) {
  return <Ark.ItemControl className={cn(styles.itemControl(), className)} {...props} />;
}
