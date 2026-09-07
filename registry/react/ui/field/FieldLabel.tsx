import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function FieldLabel({ className, children, ...props }: FieldLabelProps) {
  const styles = field();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
