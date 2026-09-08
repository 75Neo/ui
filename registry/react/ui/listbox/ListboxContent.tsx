import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function ListboxContent({ className, children, ...props }: ListboxContentProps) {
  const styles = listbox();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
