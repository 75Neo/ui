import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function ListboxValueText({ className, ...props }: ListboxValueTextProps) {
  const styles = listbox();

  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
