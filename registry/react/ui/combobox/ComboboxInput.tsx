import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Input>,
  "children"
> {}

export default function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
