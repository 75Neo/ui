import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Listbox({ className, children, ...props }: ListboxProps) {
  const styles = listbox();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
