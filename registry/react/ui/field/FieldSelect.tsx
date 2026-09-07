import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldSelectProps extends React.ComponentPropsWithRef<typeof Ark.Select> {}

export default function FieldSelect({ className, children, ...props }: FieldSelectProps) {
  const styles = field();

  return (
    <Ark.Select className={cn(styles.select(), className)} {...props}>
      {children}
    </Ark.Select>
  );
}
