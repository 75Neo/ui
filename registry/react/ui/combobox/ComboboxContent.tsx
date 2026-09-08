import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function ComboboxContent({ className, children, ...props }: ComboboxContentProps) {
  const styles = combobox();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
