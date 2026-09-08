import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function NumberInputInput({ className, ...props }: NumberInputInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
