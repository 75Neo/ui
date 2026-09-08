import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function SelectContent({ className, children, ...props }: SelectContentProps) {
  const styles = select();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
