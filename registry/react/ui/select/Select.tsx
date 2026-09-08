import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Select({ className, children, ...props }: SelectProps) {
  const styles = select();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
