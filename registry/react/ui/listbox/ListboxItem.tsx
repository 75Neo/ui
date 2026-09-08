import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function ListboxItem({ className, children, ...props }: ListboxItemProps) {
  const styles = listbox();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
