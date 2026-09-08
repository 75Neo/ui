import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Input>,
  "children"
> {}

export default function ListboxInput({ className, ...props }: ListboxInputProps) {
  const styles = listbox();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
