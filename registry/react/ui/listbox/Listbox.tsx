import React from "react";
import { Listbox as Ark, type CollectionItem, type ListboxRootProps } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxProps<T extends CollectionItem>
  extends ListboxRootProps<T>, React.RefAttributes<HTMLDivElement> {}

export default function Listbox<T extends CollectionItem>({
  className,
  children,
  ...props
}: ListboxProps<T>) {
  const styles = listbox();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
