import React from "react";
import {
  Combobox as Ark,
  type CollectionItem,
  type ComboboxRootProps,
} from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxProps<T extends CollectionItem>
  extends ComboboxRootProps<T>, React.RefAttributes<HTMLDivElement> {}

export default function Combobox<T extends CollectionItem>({
  className,
  children,
  ...props
}: ComboboxProps<T>) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
