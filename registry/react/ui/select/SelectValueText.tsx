import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function SelectValueText({ className, ...props }: SelectValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
