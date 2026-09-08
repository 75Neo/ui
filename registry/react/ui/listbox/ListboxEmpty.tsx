import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxEmptyProps extends React.ComponentPropsWithRef<typeof Ark.Empty> {}

export default function ListboxEmpty({ className, children, ...props }: ListboxEmptyProps) {
  const styles = listbox();

  return (
    <Ark.Empty className={cn(styles.empty(), className)} {...props}>
      {children}
    </Ark.Empty>
  );
}
