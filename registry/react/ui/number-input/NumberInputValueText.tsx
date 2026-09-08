import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputValueTextProps extends React.ComponentPropsWithRef<
  typeof Ark.ValueText
> {}

export default function NumberInputValueText({ className, ...props }: NumberInputValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
