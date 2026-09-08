import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function SelectValueText({ className, ...props }: SelectValueTextProps) {
  const styles = select();

  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
