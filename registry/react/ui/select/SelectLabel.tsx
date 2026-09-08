import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  const styles = select();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
