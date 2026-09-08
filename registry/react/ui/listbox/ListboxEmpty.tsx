import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

export interface ListboxEmptyProps extends React.ComponentPropsWithRef<typeof Ark.Empty> {}

export default function ListboxEmpty({ className, children, ...props }: ListboxEmptyProps) {
  return (
    <Ark.Empty className={cn(styles.empty(), className)} {...props}>
      {children}
    </Ark.Empty>
  );
}
